import { z } from 'zod';

export const VoterIdSchema = z.object({
  epicNumber: z.string().min(1, 'EPIC number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
});

export type VoterIdData = z.infer<typeof VoterIdSchema>;
