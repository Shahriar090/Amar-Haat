import type { AuthType } from '@shared/schemas/auth/auth.types.js';
import httpStatus from 'http-status';
import asyncHandler from '../../utils/async_handler.js';
import sendResponse from '../../utils/send_response.js';
import { AuthServices } from './auth.services.js';
import { setCookie } from './auth.utils.js';

const loginUser = asyncHandler(async (req, res) => {
	const payload: AuthType = {
		body: {
			email: req.body.email,
			password: req.body.password,
			ip: req.ip,
			userAgent: req.headers['user-agent'],
		},
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

export const AuthControllers = {
	loginUser,
};
