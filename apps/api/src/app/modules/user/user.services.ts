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

// get a single user
const getUserFromDb = async (id: string) => {
	const user = await UserDataSource.getUser(id);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'No User Found With This id', 'UserExists');
	}

	return user;
};

// get all users
const getAllUsersFromDb = async () => {
	const users = await UserDataSource.getAllUsers();

	if (!users.length) {
		throw new AppError(httpStatus.NOT_FOUND, 'Failed To Fetch Users.!', 'UsersNotFound');
	}

	return users;
};

export const UserServices = {
	createUserIntoDb,
	getUserFromDb,
	getAllUsersFromDb,
};
