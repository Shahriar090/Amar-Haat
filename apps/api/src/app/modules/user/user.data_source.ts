import {
	type CreateUserServerType,
	type UpdateUserServerType,
} from './../../../../../../shared/schemas/user/server/user.server.types';

import type { IUserDocument } from './user.interface.js';
import { User } from './user.model.js';

export const UserDataSource = {
	// create user
	createUser: async (payload: CreateUserServerType): Promise<IUserDocument> => {
		const newUser = await User.create(payload);
		return newUser;
	},

	// get a single user
	getUser: async (id: string): Promise<IUserDocument | null> => {
		return await User.findById(id);
	},

	// get all users
	getAllUsers: async (): Promise<IUserDocument[]> => {
		return await User.find();
	},

	// update a user
	updateUserInfo: async (id: string, payload: UpdateUserServerType): Promise<IUserDocument | null> => {
		return await User.findByIdAndUpdate(id, payload, { new: true });
	},

	// delete a user
	deleteUser: async (id: string): Promise<IUserDocument | null> => {
		return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
	},
};
