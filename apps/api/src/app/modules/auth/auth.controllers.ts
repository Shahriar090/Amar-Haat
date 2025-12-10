import type { AuthPayloadType } from '@shared/schemas/auth/auth.types.js';
import httpStatus from 'http-status';
import asyncHandler from '../../utils/async_handler.js';
import sendResponse from '../../utils/send_response.js';
import { AuthServices } from './auth.services.js';
import { clearCookie, setCookie } from './auth.utils.js';

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const ip = req.ip;
	const userAgent = req.headers['user-agent'];

	const payload: AuthPayloadType = {
		email,
		password,
		ip,
		userAgent,
	};

	const result = await AuthServices.loginUser(payload);
	const { accessToken, refreshToken, user } = result;

	setCookie(res, refreshToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'User Login Successful.',
		data: {
			accessToken,
			user: { id: user._id, role: user.role },
		},
	});
});

// refresh token
const refreshToken = asyncHandler(async (req, res) => {
	const { refreshToken } = req.cookies;

	const { newAccessToken, newRefreshToken } = await AuthServices.refreshToken(refreshToken, req);
	setCookie(res, newRefreshToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Token Refreshed Successfully',
		data: { newAccessToken: newAccessToken },
	});
});

// logout
const logoutUser = asyncHandler(async (req, res) => {
	const { refreshToken } = req.cookies;
	await AuthServices.logoutUser(refreshToken);

	clearCookie(res);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Logout Successful',
		data: {},
	});
});

export const AuthControllers = {
	loginUser,
	refreshToken,
	logoutUser,
};
