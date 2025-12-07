import type { AuthType } from '@shared/schemas/auth/auth.types.js';
import type { RefreshSessionType } from '@shared/schemas/sessions/refresh.session.types.js';
import httpStatus from 'http-status';
import AppError from '../../errors/app_error.js';
import { SessionServices } from '../sessions/sessions.services.js';
import { User } from '../user/user.model.js';
import { generateAccessToken, generateRefreshToken } from './auth.utils.js';

const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const loginUser = async (payload: AuthType) => {
	// check if the user is exist first
	const user = await User.isUserExists(payload.body.email);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Not Found', 'UserNotFound');
	}

	// check if the user is deleted or not
	const isDeleted = user.isDeleted;

	if (isDeleted) {
		throw new AppError(httpStatus.NOT_FOUND, 'This User Is Already Deleted ', 'UserNotFound');
	}

	// check if the hashed password matches with plain text password
	if (!(await user.isPasswordMatched(payload.body.password))) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password! Please Try Again', 'IncorrectPassword');
	}

	// generate tokens
	const accessToken = generateAccessToken(user);
	const { token: refreshToken, jti } = generateRefreshToken(user);

	const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);

	const sessionPayload: RefreshSessionType = {
		userId: user._id,
		jti,
		ip: payload.body.ip,
		userAgent: payload.body.userAgent,
		expiresAt,
	};

	await SessionServices.createSession(sessionPayload);

	return {
		accessToken,
		refreshToken,
		user,
	};
};

export const AuthServices = {
	loginUser,
};
