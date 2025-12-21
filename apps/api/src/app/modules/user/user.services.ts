import type { AddressType } from '@shared/schemas/common/address.schema.js';
import type { UpdateAddressType } from '@shared/schemas/user/address/update.address.schema.js';
import type { CreateUserServerType, UpdateUserServerType } from '@shared/schemas/user/server/user.server.types.js';
import httpStatus from 'http-status';
import AppError from '../../errors/app_error.js';
import { UserDataSource } from './user.data_source.js';
import type { IUserDocument } from './user.interface.js';
import { User } from './user.model.js';

const createUserIntoDb = async (payload: CreateUserServerType): Promise<IUserDocument> => {
	// check if the requested user is already exist or not
	const isUserExist = await User.isUserExists(payload.email);

	if (isUserExist) {
		throw new AppError(httpStatus.CONFLICT, 'User Already Exists With This Email.!', 'UserAlreadyExists');
	}

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

// update a user
const updateUserIntoDB = async (id: string, payload: UpdateUserServerType): Promise<IUserDocument | null> => {
	const { name, ...remainingUserData } = payload;

	if (Object.keys(remainingUserData).length === 0 && (!name || Object.keys(name).length === 0)) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Nothing to update', 'NoUpdateData');
	}

	const modifiedUpdatedData: Record<string, unknown> = { ...remainingUserData };

	if (name && typeof name === 'object' && Object.keys(name).length) {
		for (const [key, value] of Object.entries(name)) {
			modifiedUpdatedData[`name.${key}`] = value;
		}
	}

	const result = await UserDataSource.updateUserInfo(id, modifiedUpdatedData);

	if (!result) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Not Found.!', 'UserNotFound');
	}
	return result;
};

// delete a user
const deleteUserFromDb = async (id: string) => {
	const isUserExists = await User.findById(id);
	if (!isUserExists) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Not Found With This Id.!', 'UserNotFound');
	}
	const result = await UserDataSource.deleteUser(id);
	return result;
};

// address related logic starts

// add address
const addAddress = async (id: string, address: AddressType[]) => {
	if (!address || address.length === 0) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Address is required', 'AddressIsRequired');
	}

	const result = await UserDataSource.addAddress(id, address);

	if (!result) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Not Found', 'UserNotFound');
	}

	return result;
};

// update address
const updateAddress = async (userId: string, addressId: string, payload: UpdateAddressType) => {
	if (Object.keys(payload).length === 0) {
		throw new AppError(httpStatus.BAD_REQUEST, 'No Fields Provided For Update', 'NoFieldProvided');
	}

	const updatedAddress = await UserDataSource.updateAddress(userId, addressId, payload);

	if (!updatedAddress) {
		throw new AppError(httpStatus.BAD_REQUEST, 'User Or Address Not Found', 'UserOrAddressNotFound');
	}

	return updatedAddress;
};

export const UserServices = {
	createUserIntoDb,
	getUserFromDb,
	getAllUsersFromDb,
	updateUserIntoDB,
	deleteUserFromDb,
	addAddress,
	updateAddress,
};
