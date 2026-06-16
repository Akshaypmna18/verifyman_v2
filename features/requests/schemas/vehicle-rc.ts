import { z } from 'zod';

export const VehicleRCSchema = z.object({
  registrationNumber: z.string().min(1, 'Registration number is required'),
});

export type VehicleRCData = z.infer<typeof VehicleRCSchema>;
