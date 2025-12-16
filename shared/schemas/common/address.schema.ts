import { z } from 'zod';

export const AddressSchema = z.object({
	type: z.enum(['home', 'work', 'other']).default('home'),
	fullName: z.string().min(2),
	phone: z.string().min(8),
	street: z.string().min(5),
	city: z.string().min(2),
	state: z.string().optional(),
	zipCode: z.string().optional(),
	country: z.string().min(2),
});

export type AddressType = z.infer<typeof AddressSchema>;
