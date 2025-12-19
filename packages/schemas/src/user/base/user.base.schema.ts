// import { EmailSchema, GenderEnum, PhoneSchema, RoleEnum, UserNameSchema } from 'packages/schemas/src/common';
import { z } from 'zod';
import { EmailSchema, GenderEnum, PhoneSchema, RoleEnum, UserNameSchema } from '../../common/';

export const BaseUserSchema = z.object({
	name: UserNameSchema,
	email: EmailSchema,
	phone: PhoneSchema,
	gender: GenderEnum,
	avatar: z.url('Invalid image URL').or(z.literal('')).default('').optional(),
	role: RoleEnum.optional(),
});
