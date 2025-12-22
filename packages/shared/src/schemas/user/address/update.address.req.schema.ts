import { z } from 'zod';
import { AddressSchema } from '../../common/address.schema.js';

export const UpdateAddressreqSchema = z.object({
	body: z.object({
		address: AddressSchema.partial(),
	}),
});

export type UpdateAddressType = z.infer<typeof UpdateAddressreqSchema>;
