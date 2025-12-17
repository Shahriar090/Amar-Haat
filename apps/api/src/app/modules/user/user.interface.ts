// instance methods

import type { Document, Model } from 'mongoose';
import type { CreateUserServerType } from '../../../../../../shared/schemas/user/server/user.server.types';

export interface UserInstanceMethods {
	isPasswordMatched(plainTextPassword: string): Promise<boolean>;
}

// document type
export type IUserDocument = CreateUserServerType & Document & UserInstanceMethods;

// static methods

export interface UserStaticMethods extends Model<IUserDocument> {
	isUserExists(email: string): Promise<IUserDocument | null>;
}
