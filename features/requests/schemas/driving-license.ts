import { z } from 'zod';

export const DrivingLicenseSchema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

export type DrivingLicenseData = z.infer<typeof DrivingLicenseSchema>;
