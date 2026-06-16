import { z } from 'zod';

export const EmploymentSchema = z.object({
  employerName: z.string().min(1, 'Employer name is required'),
  positionHeld: z.string().min(1, 'Position held is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  refereeName: z.string().min(1, 'Referee name is required'),
  refereeEmail: z.string().email('Invalid referee email'),
});

export type EmploymentData = z.infer<typeof EmploymentSchema>;
