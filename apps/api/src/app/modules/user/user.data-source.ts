import type { IUser } from './user.interface.js';
import { User } from './user.model.js';

export const UserDataSource = {
	// create user
	createUser: async (payload: IUser): Promise<IUser> => {
		const newUser = await User.create(payload);
		return newUser.toObject();
	},
};
