import { z } from 'zod';

export const CriminalSchema = z.object({
  fatherName: z.string().min(1, 'Father name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  address: z.string().min(1, 'Current address is required'),
});

export type CriminalData = z.infer<typeof CriminalSchema>;
