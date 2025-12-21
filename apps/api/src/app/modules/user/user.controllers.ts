import httpStatus from 'http-status';
import asyncHandler from '../../utils/async_handler.js';
import sendResponse from '../../utils/send_response.js';
import { UserServices } from './user.services.js';

// create a new user
const createUser = asyncHandler(async (req, res) => {
	const result = await UserServices.createUserIntoDb(req.body.user);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User Created Successfully',
		data: result,
	});
});

// get a single user
const getUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const result = await UserServices.getUserFromDb(id as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Data Retrieved Successfully',
		data: result,
	});
});

// get all users
const getAllUsers = asyncHandler(async (_req, res) => {
	const result = await UserServices.getAllUsersFromDb();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users Data Retrieved Successfully',
		data: result,
	});
});

// update a user
const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const { user } = req.body;
	const result = await UserServices.updateUserIntoDB(id as string, user);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users Data Updated Successfully',
		data: result,
	});
});

// delete a user
const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const result = await UserServices.deleteUserFromDb(id as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Users Deleted Successfully',
		data: result,
	});
});

// address related logic starts

// add address

const addAddress = asyncHandler(async (req, res) => {
	const { address } = req.body;
	const { id } = req.params;
	const result = await UserServices.addAddress(id as string, address);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Address Added Successfully',
		data: result,
	});
});

// update address
const updateAddress = asyncHandler(async (req, res) => {
	const { userId, addressId } = req.params;
	const { address } = req.body;

	const result = await UserServices.updateAddress(userId as string, addressId as string, address);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Address Updated Successfully',
		data: result,
	});
});

// remove address
const removeAddress = asyncHandler(async (req, res) => {
	const { userId, addressId } = req.params;
	const result = await UserServices.removeAddress(userId as string, addressId as string);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Address Removed Successfully',
		data: result,
	});
});

export const UserControllers = {
	createUser,
	getUser,
	getAllUsers,
	updateUser,
	deleteUser,
	addAddress,
	updateAddress,
	removeAddress,
};
