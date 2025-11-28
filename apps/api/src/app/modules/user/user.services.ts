import httpStatus from 'http-status';
import AppError from '../../errors/app_error.js';
import { UserDataSource } from './user.data-source.js';
import type { IUser } from './user.interface.js';
import { User } from './user.model.js';

const createUserIntoDb = async (payload: IUser) => {
	// check if the requested user is already exist or not
	const isUserExist = await User.isUserExists(payload.email);

	if (isUserExist) {
		throw new AppError(httpStatus.CONFLICT, 'User Already Exists With This Email.!', 'UserAlreadyExists');
	}

	// create new user
	const user = await UserDataSource.createUser(payload);
	return user;
};

export const UserServices = {
	createUserIntoDb,
};
