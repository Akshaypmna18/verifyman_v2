import { VerificationServiceType } from '../request-types';

export interface RequestDto {
  id: string;
  referenceNumber: string;
  verificationType: string;
  candidateFirstName: string | null;
  candidateLastName: string | null;
  candidateEmail: string | null;
  candidateMobile: string | null;
  verificationData: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string | null;
}

export interface CreateRequestDto {
  id?: string;
  referenceNumber?: string;
  verificationType: string;
  candidateFirstName?: string | null;
  candidateLastName?: string | null;
  candidateEmail?: string | null;
  candidateMobile?: string | null;
  candidate?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    mobile?: string | null;
  };
  verificationData?: any;
  status?: string;
  createdBy?: string | null;
}

export interface UpdateRequestDto {
  verificationType?: string;
  candidateFirstName?: string | null;
  candidateLastName?: string | null;
  candidateEmail?: string | null;
  candidateMobile?: string | null;
  verificationData?: any;
  status?: string;
}
