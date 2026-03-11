import { z } from 'zod';
import { AddressSchema } from '../common/address.schema';

export const updateAddressSchema = z.object({
	body: z.object({
		address: AddressSchema.partial(),
	}),
});

export type UpdateAddressType = z.infer<typeof updateAddressSchema>;
