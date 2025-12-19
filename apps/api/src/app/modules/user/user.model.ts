import type { UserNameType } from '@amar-haat/schemas';
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
// import config from '../../config/index.js';
import config from '@/app/config/index';
import type { IUserDocument, UserStaticMethods } from './user.interface.js';

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

export const UserSchema = new Schema<IUserDocument, UserStaticMethods>(
	{
		name: UserNameSchema,
		email: { type: String, required: true, unique: true, trim: true, lowercase: true },
		password: { type: String, required: true, select: false },
		phone: { type: String, required: true },
		gender: { type: String, required: true },
		avatar: { type: String, required: false },
		role: { type: String, required: false, default: 'customer' },
		hasSellerProfile: { type: Boolean, default: false },
		sellerStatus: { type: String, default: 'none' },
		isDeleted: { type: Boolean, default: false },
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

// static method to check if the plain-text password matches the hashed password.
UserSchema.methods.isPasswordMatched = async function (plainTextPassword: string) {
	return await bcrypt.compare(plainTextPassword, this.password);
};

export const User = model<IUserDocument, UserStaticMethods>('User', UserSchema);
