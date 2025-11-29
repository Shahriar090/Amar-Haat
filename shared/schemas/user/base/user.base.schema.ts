import { z } from 'zod';
import { GenderEnum, RoleEnum } from '../../common/enums/user.enums';
import { PhoneSchema } from '../../common/phone.schema';
import { UserNameSchema } from '../../common/user_name.schema';

export const BaseUserSchema = z.object({
	name: UserNameSchema,
	email: z.email('Please enter a valid email').toLowerCase().trim(),
	phone: PhoneSchema,
	gender: GenderEnum,
	avatar: z.url('Invalid image URL').optional().or(z.literal('')),
	role: RoleEnum,
});
