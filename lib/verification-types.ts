export type AddressVerificationData = {
  addressInformation: {
    address: string;
    zip?: string | null;
    city?: string | null;
    state?: string | null;
  };
  contactPersonInformation?: {
    contactPersonName?: string | null;
    contactPersonPhone?: string | null;
  };
};

export type CriminalRecordCheckData = {
  criminalRecordInformation: {
    fatherName: string;
    dateOfBirth: string;
    address: string;
    aadharFrontPhoto?: string | null;
    aadharBackPhoto?: string | null;
  };
};

export type DrivingLicenseVerificationData = {
  drivingLicenseInformation: {
    drivingLicenseNumber: string;
    dateOfBirth: string;
  };
};

export type VoterIdVerificationData = {
  voterIdInformation: {
    epicNumber: string;
    nameOnVoterId: string;
  };
};

export type PassportVerificationData = {
  passportInformation: {
    passportNumber: string;
    dateOfBirth: string;
    nameOnPassport: string;
  };
};

export type EmploymentVerificationData = {
  employmentInformation: {
    placementCompany: string;
    claimedStartDate: string;
    claimedEndDate: string;
    claimedPositionHeld: string;
  };
  refereeInformation: {
    refereeName: string;
    refereeEmail: string;
    agencyReference: string;
    requestingAgency: string;
  };
  employerResponse?: {
    confirmedStartDate?: string | null;
    confirmedEndDate?: string | null;
    confirmedPositionHeld?: string | null;
    withholdRefereeIdentity?: boolean;
    signedAt?: string | null;
    signedByName?: string | null;
    refereeTitlePosition?: string | null;
  };
};

export const VERIFICATION_TYPES = [
  'address-verification',
  'criminal-record-check',
  'employment-verification',
  'driving-license-verification',
  'voter-id-verification',
  'passport-verification',
  'vehicle-rc-verification',
] as const;

export type VerificationType = (typeof VERIFICATION_TYPES)[number];

export const REQUEST_STATUSES = [
  'processing',
  'pending_consent',
  'qa_pending',
  'in-progress',
  'completed',
  'failed',
  'draft',
  'deleted',
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export type VerificationDataByType = {
  'address-verification': AddressVerificationData;
  'criminal-record-check': CriminalRecordCheckData;
  'employment-verification': EmploymentVerificationData;
  'driving-license-verification': DrivingLicenseVerificationData;
  'voter-id-verification': VoterIdVerificationData;
  'passport-verification': PassportVerificationData;
  'vehicle-rc-verification': unknown;
};

export type VerificationRequest<T extends VerificationType = VerificationType> = {
  id: string;
  type: T;
  status: RequestStatus;
  data: VerificationDataByType[T];
};
