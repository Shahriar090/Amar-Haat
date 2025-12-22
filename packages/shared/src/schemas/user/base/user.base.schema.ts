import { z } from 'zod';
import { EmailSchema } from '../../common/email.schema.js';
import { GenderEnum, RoleEnum } from '../../common/enums/user.enums.js';
import { PhoneSchema } from '../../common/phone.schema.js';
import { UserNameSchema } from '../../common/user_name.schema.js';

export const BaseUserSchema = z.object({
	name: UserNameSchema,
	email: EmailSchema,
	phone: PhoneSchema,
	gender: GenderEnum,
	avatar: z.url('Invalid image URL').or(z.literal('')).default('').optional(),
	role: RoleEnum.optional(),
});
