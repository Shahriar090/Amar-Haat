import { z } from 'zod';
import { GenderEnum, RoleEnum } from '../../common/enums/user.enums.js';
import { PhoneSchema } from '../../common/phone.schema.js';
import { UserNameSchema } from '../../common/user_name.schema.js';

export const BaseUserSchema = z.object({
	name: UserNameSchema,
	email: z.email('Please enter a valid email').toLowerCase().trim(),
	phone: PhoneSchema,
	gender: GenderEnum,
	avatar: z.url('Invalid image URL').or(z.literal('')).default('').optional(),
	role: RoleEnum.optional(),
});
