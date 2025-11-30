import type { UserNameType } from '@shared/schemas/common/user_name.schema.js';
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config/index.js';
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
		role: { type: String, required: false, default: 'customer' },
		hasSellerProfile: { type: Boolean, default: false, required: false },
		sellerStatus: { type: String, required: false },
		isDeleted: { type: Boolean, default: false, required: false },
	},
	{ timestamps: true },
);

// static method to check if the user already exist or not
UserSchema.statics.isUserExists = async function (email: string) {
	return this.findOne({ email }).select('+password');
};

// hash the password before saving into DB
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();

	try {
		this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_round));
		next();
	} catch (err: unknown) {
		next(err as Error);
	}
});

export const User = model<IUser, UserModel>('User', UserSchema);
