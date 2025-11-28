import { z } from 'zod';

export const GenderEnum = z.enum(['male', 'female', 'others']);
export const RoleEnum = z.enum(['customer', 'seller', 'admin']).default('customer');
export const SellerStatusEnum = z
	.enum(['none', 'pending', 'approved', 'rejected', 'suspended'])
	.default('none')
	.optional();

export type GenderType = z.infer<typeof GenderEnum>;
export type RoleType = z.infer<typeof RoleEnum>;
export type SellerStatusType = z.infer<typeof SellerStatusEnum>;
