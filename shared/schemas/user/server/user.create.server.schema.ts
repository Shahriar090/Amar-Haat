import { z } from 'zod';
import { SellerStatusEnum } from '../../common/enums/user.enums.js';
import { PasswordSchema } from '../../common/password.schema.js';
import { BaseUserSchema } from '../base/user.base.schema.js';

export const CreateUserServerSchema = BaseUserSchema.extend({
	password: PasswordSchema,
	hasSellerProfile: z.boolean().default(false).optional(),
	sellerStatus: SellerStatusEnum.default('none').optional(),
	isDeleted: z.boolean().default(false).optional(),
});
