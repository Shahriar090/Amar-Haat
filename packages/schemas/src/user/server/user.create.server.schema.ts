import { z } from 'zod';
import { PasswordSchema, SellerStatusEnum } from '../../common';
import { BaseUserSchema } from '../base/user.base.schema';

export const CreateUserServerSchema = BaseUserSchema.extend({
	password: PasswordSchema,
	hasSellerProfile: z.boolean().default(false),
	sellerStatus: SellerStatusEnum.default('none'),
	isDeleted: z.boolean().default(false),
});
