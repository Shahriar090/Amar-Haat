import { AddressSchema } from '@shared/schemas/common/address.schema.js';
import { z } from 'zod';
import { SellerStatusEnum } from '../../common/enums/user.enums.js';
import { PasswordSchema } from '../../common/password.schema.js';
import { BaseUserSchema } from '../base/user.base.schema.js';

export const CreateUserServerSchema = BaseUserSchema.extend({
	password: PasswordSchema,
	hasSellerProfile: z.boolean().default(false),
	sellerStatus: SellerStatusEnum.default('none'),
	isDeleted: z.boolean().default(false),
	isActive: z.boolean().default(true),
	address: AddressSchema.optional(),
});
