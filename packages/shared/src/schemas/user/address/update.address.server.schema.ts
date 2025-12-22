import type { z } from 'zod';
import { AddressSchema } from '../../common/address.schema.js';

export const UpdateAddressServerSchema = AddressSchema.partial();
export type UpdateAddressServerType = z.infer<typeof UpdateAddressServerSchema>;
