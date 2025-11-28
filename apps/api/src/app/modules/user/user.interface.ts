import type { GenderType, RoleType, SellerStatusType } from '@shared/schemas/common/enums/user.enums.js';
import type { PasswordType } from '@shared/schemas/common/password.schema.js';
import type { PhoneType } from '@shared/schemas/common/phone.schema.js';
import type { UserNameType } from '@shared/schemas/common/user_name.schema.js';
import type { Document, Model } from 'mongoose';

export interface IUser extends Document {
	name: UserNameType;
	email: string;
	password: PasswordType;
	phone: PhoneType;
	gender: GenderType;
	avatar?: string;
	role: RoleType;
	hasSellerProfile: boolean;
	sellerStatus: SellerStatusType;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
	// instance method
	isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}

// static methods
export interface UserModel extends Model<IUser> {
	isUserExists(email: string): Promise<IUser | null>;
}
