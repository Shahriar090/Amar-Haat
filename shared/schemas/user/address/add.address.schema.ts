import { AddressSchema } from '@shared/schemas/common/address.schema.js';
import { z } from 'zod';

export const AddAddressRequestSchema = z.object({
	body: z.object({
		address: z.array(AddressSchema),
	}),
});
