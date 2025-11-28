import { z } from 'zod';
import { GenderEnum, RoleEnum, SellerStatusEnum } from '../common/enums/user.enums.js';
import { PasswordSchema } from '../common/password.schema.js';
import { PhoneSchema } from '../common/phone.schema.js';
import { UserNameSchema } from '../common/user_name.schema.js';

export const UserValidationSchema = z.object({
	body: z.object({
		user: z.object({
			name: UserNameSchema,
			email: z.email('Please enter a valid email').toLowerCase().trim(),
			password: PasswordSchema,
			phone: PhoneSchema,
			gender: GenderEnum,
			avatar: z.url('Invalid image URL').optional().or(z.literal('')),
			role: RoleEnum,
			hasSellerProfile: z.boolean().default(false).optional(),
			sellerStatus: SellerStatusEnum,
			isDeleted: z.boolean().optional().default(false),
		}),
	}),
});

export type UserType = z.infer<typeof UserValidationSchema>;
