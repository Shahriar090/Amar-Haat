import { AuthServices } from '@/app/modules/auth/auth.services';
import type { AuthType } from '../../../../../../shared/schemas/auth/auth.types';

import { setCookie } from '@/app/modules/auth/auth.utils';
import asyncHandler from '@/app/utils/async_handler';
import sendResponse from '@/app/utils/send_response';
import httpStatus from 'http-status';

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

// refresh token
const refreshToken = asyncHandler(async (req, res) => {
	const { refreshToken } = req.cookies;
	// const payload = {
	// 	ip: req.ip,
	// 	userAgent: req.headers['user-agent'],
	// };
	const { newAccessToken, newRefreshToken } = await AuthServices.refreshToken(refreshToken, req);
	setCookie(res, newRefreshToken);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: 'Token Refreshed Successfully',
		data: { newAccessToken: newAccessToken },
	});
});

export const AuthControllers = {
	loginUser,
	refreshToken,
};
