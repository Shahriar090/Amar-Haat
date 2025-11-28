import type { UserNameType } from '@shared/schemas/common/user_name.schema.js';
import { model, Schema } from 'mongoose';
import type { IUser, UserModel } from './user.interface.js';

const UserNameSchema = new Schema<UserNameType>(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		middleName: {
			type: String,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ _id: false },
);

export const UserSchema = new Schema<IUser, UserModel>(
	{
		name: UserNameSchema,
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true, select: false },
		phone: { type: String, required: true },
		gender: { type: String, required: true },
		avatar: { type: String, default: '' },
		role: { type: String, required: true },
		hasSellerProfile: { type: Boolean, default: false },
		sellerStatus: { type: String, required: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

// static method to check if the user already exist or not
UserSchema.statics.isUserExists = async function (email: string) {
	return this.findOne({ email }).select('+password');
};
export const User = model<IUser, UserModel>('User', UserSchema);
