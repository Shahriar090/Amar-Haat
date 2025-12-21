import { AddressSchema } from '@shared/schemas/common/address.schema.js';
import { z } from 'zod';

export const updateAddressSchema = z.object({
	body: z.object({
		address: AddressSchema.partial(),
	}),
});

export type UpdateAddressType = z.infer<typeof updateAddressSchema>;
