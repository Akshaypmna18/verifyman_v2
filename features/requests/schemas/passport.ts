import { z } from 'zod';

export const PassportSchema = z.object({
  passportNumber: z.string().min(1, 'Passport number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

export type PassportData = z.infer<typeof PassportSchema>;
