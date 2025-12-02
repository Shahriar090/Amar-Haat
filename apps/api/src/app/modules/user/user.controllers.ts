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
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'User Data Retrieved Successfully',
		data: result,
	});
});

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
	const result = await UserServices.getAllUsersFromDb();

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: 'Users Data Retrieved Successfully',
		data: result,
	});
});

export const UserControllers = {
	createUser,
	getUser,
	getAllUsers,
};
