import { z } from 'zod';
import { AddressSchema } from '../../common/address.schema.js';

export const AddAddressRequestSchema = z.object({
	body: z.object({
		address: z.array(AddressSchema),
	}),
});
