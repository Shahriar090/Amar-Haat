import type { IUser } from './user.interface.js';
import { User } from './user.model.js';

export const UserDataSource = {
	// create user
	createUser: async (payload: IUser): Promise<IUser> => {
		const newUser = await User.create(payload);
		return newUser.toObject();
	},

	// get a single user
	getUser: async (id: string): Promise<IUser | null> => {
		return await User.findById(id);
	},

	// get all users
	getAllUsers: async (): Promise<IUser[]> => {
		return await User.find().lean<IUser[]>();
	},
};
