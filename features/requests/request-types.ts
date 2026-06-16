import { z } from 'zod';
import { AddressSchema } from './schemas/address';
import { CriminalSchema } from './schemas/criminal';
import { EmploymentSchema } from './schemas/employment';
import { DrivingLicenseSchema } from './schemas/driving-license';
import { VoterIdSchema } from './schemas/voter-id';
import { PassportSchema } from './schemas/passport';
import { VehicleRCSchema } from './schemas/vehicle-rc';

export const CandidateSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  mobile: z.string().min(10, 'Mobile number must be at least 10 digits'),
});

export const ServiceTypeSchema = z.enum([
  'address-verification',
  'criminal-record-check',
  'employment-verification',
  'driving-license-verification',
  'voter-id-verification',
  'passport-verification',
  'vehicle-rc-verification',
]);

export type VerificationServiceType = z.infer<typeof ServiceTypeSchema>;

const BaseSchema = z.object({
  candidate: CandidateSchema,
});

export const CreateRequestSchema = z.discriminatedUnion('serviceType', [
  BaseSchema.extend({
    serviceType: z.literal('address-verification'),
    address: AddressSchema,
  }).passthrough(),
  BaseSchema.extend({
    serviceType: z.literal('criminal-record-check'),
    criminal: CriminalSchema,
  }).passthrough(),
  BaseSchema.extend({
    serviceType: z.literal('employment-verification'),
    employment: EmploymentSchema,
  }).passthrough(),
  BaseSchema.extend({
    serviceType: z.literal('driving-license-verification'),
    drivingLicense: DrivingLicenseSchema,
  }).passthrough(),
  BaseSchema.extend({
    serviceType: z.literal('voter-id-verification'),
    voterId: VoterIdSchema,
  }).passthrough(),
  BaseSchema.extend({
    serviceType: z.literal('passport-verification'),
    passport: PassportSchema,
  }).passthrough(),
  BaseSchema.extend({
    serviceType: z.literal('vehicle-rc-verification'),
    vehicleRC: VehicleRCSchema,
  }).passthrough(),
]);

export type CreateRequestData = z.infer<typeof CreateRequestSchema>;

export type StepId = 'candidate' | 'service-form' | 'review';

export interface Step {
  id: StepId;
  title: string;
}

export const STEPS: Step[] = [
  { id: 'candidate', title: 'Candidate Information' },
  { id: 'service-form', title: 'Service Details' },
  { id: 'review', title: 'Review & Submit' },
];
