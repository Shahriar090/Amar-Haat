import { z } from 'zod';
import { SellerStatusEnum } from '../../common/enums/user.enums';
import { PasswordSchema } from '../../common/password.schema';
import { BaseUserSchema } from '../base/user.base.schema';

export const CreateUserServerSchema = BaseUserSchema.extend({
	password: PasswordSchema,
	hasSellerProfile: z.boolean().default(false),
	sellerStatus: SellerStatusEnum.default('none'),
	isDeleted: z.boolean().default(false),
});
