import { CreateRequestData, VerificationServiceType } from '../request-types';
import { VerificationRequest, RequestStatus as UIRequestStatus } from '../request-mock-store';
import { RequestDto, CreateRequestDto, UpdateRequestDto } from './request.dto';

export const dtoToRequest = (dto: RequestDto): VerificationRequest => {
  // Extract service-specific data from verificationData
  // In frontend CreateRequestData, the data is under a key matching the serviceType (or similar)
  // Let's look at CreateRequestSchema in request-types.ts again.
  
  const serviceType = dto.verificationType as VerificationServiceType;
  
  const candidate = {
    firstName: dto.candidateFirstName ?? '',
    lastName: dto.candidateLastName ?? '',
    email: dto.candidateEmail ?? '',
    mobile: dto.candidateMobile ?? '',
  };

  // Build the CreateRequestData object
  const data: any = {
    serviceType,
    candidate,
  };

  // Map backend verificationData to frontend keys
  // address-verification -> address
  // criminal-record-check -> criminal
  // etc.
  const serviceDataKey = getServiceDataKey(serviceType);
  if (serviceDataKey) {
    data[serviceDataKey] = dto.verificationData;
  }

  return {
    id: dto.id,
    referenceNumber: dto.referenceNumber,
    candidateName: `${dto.candidateFirstName ?? ''} ${dto.candidateLastName ?? ''}`.trim(),
    serviceType,
    status: mapBackendStatusToUI(dto.status),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    data: data as CreateRequestData,
  };
};

export const requestToCreateDto = (data: CreateRequestData): CreateRequestDto => {
  const serviceDataKey = getServiceDataKey(data.serviceType);
  const verificationData = serviceDataKey ? (data as any)[serviceDataKey] : {};

  return {
    verificationType: data.serviceType,
    candidateFirstName: data.candidate.firstName,
    candidateLastName: data.candidate.lastName,
    candidateEmail: data.candidate.email,
    candidateMobile: data.candidate.mobile,
    verificationData,
    status: 'pending',
  };
};

export const requestToUpdateDto = (data: Partial<CreateRequestData>): UpdateRequestDto => {
  const dto: UpdateRequestDto = {};
  
  if (data.serviceType) {
    dto.verificationType = data.serviceType;
  }
  
  if (data.candidate) {
    if (data.candidate.firstName) dto.candidateFirstName = data.candidate.firstName;
    if (data.candidate.lastName) dto.candidateLastName = data.candidate.lastName;
    if (data.candidate.email) dto.candidateEmail = data.candidate.email;
    if (data.candidate.mobile) dto.candidateMobile = data.candidate.mobile;
  }

  if (data.serviceType) {
    const serviceDataKey = getServiceDataKey(data.serviceType);
    if (serviceDataKey && (data as any)[serviceDataKey]) {
      dto.verificationData = (data as any)[serviceDataKey];
    }
  }

  return dto;
};

// Helper to map serviceType to the data key used in CreateRequestData union
function getServiceDataKey(serviceType: VerificationServiceType): string | null {
  switch (serviceType) {
    case 'address-verification': return 'address';
    case 'criminal-record-check': return 'criminal';
    case 'employment-verification': return 'employment';
    case 'driving-license-verification': return 'drivingLicense';
    case 'voter-id-verification': return 'voterId';
    case 'passport-verification': return 'passport';
    case 'vehicle-rc-verification': return 'vehicleRC';
    default: return null;
  }
}

// Helper to map backend status to UI status
function mapBackendStatusToUI(status: string): UIRequestStatus {
  switch (status.toLowerCase()) {
    case 'pending':
    case 'processing':
    case 'in-progress':
      return 'pending';
    case 'completed':
      return 'completed';
    case 'failed':
      return 'failed';
    default:
      return 'pending';
  }
}
