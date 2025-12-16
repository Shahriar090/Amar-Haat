import type { AddressType } from '@shared/schemas/common/address.schema.js';
import type { CreateUserServerType, UpdateUserServerType } from '@shared/schemas/user/server/user.server.types.js';
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

	// address related functions

	// add address
	addAddress: async (id: string, address: AddressType[]) => {
		return User.findByIdAndUpdate(id, { $push: { address: { $each: address } } }, { new: true, runValidators: true });
	},
};
