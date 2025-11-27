import { z } from 'zod';
import { PasswordSchema } from '../common/password.schema';
import { PhoneSchema } from '../common/phone.schema';
import { UserNameSchema } from '../common/user_name.schema';

export const UserValidationSchema = z.object({
	name: UserNameSchema,

	email: z.email('Please enter a valid email').toLowerCase().trim(),

	password: PasswordSchema,

	phone: PhoneSchema,

	avatar: z.url('Invalid image URL').optional().or(z.literal('')),

	role: z.enum(['customer', 'seller', 'admin']).default('customer'),

	hasSellerProfile: z.boolean().default(false).optional(),

	sellerStatus: z.enum(['none', 'pending', 'approved', 'rejected', 'suspended']).default('none').optional(),
});

export type UserType = z.infer<typeof UserValidationSchema>;
