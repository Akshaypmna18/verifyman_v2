export type VerificationServiceType =
  | "address-verification"
  | "criminal-record-check"
  | "employment-verification"
  | "driving-license-verification"
  | "voter-id-verification"
  | "passport-verification"
  | "vehicle-rc-verification";

export interface VerificationService {
  id: string;
  type: VerificationServiceType;
  name: string;
  description: string;
  price: number;
  tatLabel: string;
}
