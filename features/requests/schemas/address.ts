import { z } from 'zod';

export const AddressSchema = z.object({
  addressLine1: z.string().min(1, 'Address Line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(6, 'Pincode must be at least 6 digits'),
  country: z.string().min(1, 'Country is required'),
});

export type AddressData = z.infer<typeof AddressSchema>;
