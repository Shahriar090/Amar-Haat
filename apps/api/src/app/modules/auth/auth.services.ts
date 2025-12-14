import type { AuthPayloadType } from '@shared/schemas/auth/auth.types.js';
import type { RefreshSessionType } from '@shared/schemas/sessions/refresh.session.types.js';
import type { Request } from 'express';
import httpStatus from 'http-status';
import type { JwtPayload } from 'jsonwebtoken';
import type { Types } from 'mongoose';
import config from '../../config/index.js';
import AppError from '../../errors/app_error.js';
import { SessionServices } from '../sessions/sessions.services.js';
import { User } from '../user/user.model.js';
import { generateAccessToken, generateRefreshToken, REFRESH_TOKEN_MAX_AGE_MS, verifyJwt } from './auth.utils.js';

const loginUser = async (payload: AuthPayloadType) => {
	const { email, password, ip, userAgent } = payload;
	// check if the user is exist first
	const user = await User.isUserExists(email);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Not Found', 'UserNotFound');
	}

	// check if the user is deleted or not
	const isDeleted = user.isDeleted;

	if (isDeleted) {
		throw new AppError(httpStatus.NOT_FOUND, 'This User Is Already Deleted ', 'UserNotFound');
	}

	// check user status (active or blocked)

	const isUserActive = user.isActive;

	if (!isUserActive) {
		throw new AppError(httpStatus.FORBIDDEN, 'User Account Blocked', 'UserAccountBlocked');
	}

	// check if the hashed password matches with plain text password
	if (!(await user.isPasswordMatched(password))) {
		throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password! Please Try Again', 'IncorrectPassword');
	}

	try {
		const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);

		// generate refresh token
		// jti = Json Web Token Id
		const { token: refreshToken, jti } = generateRefreshToken(user);

		// create session
		const sessionPayload: RefreshSessionType = {
			userId: user._id as Types.ObjectId,
			jti,
			ip,
			userAgent,
			expiresAt,
		};

		await SessionServices.createSession(sessionPayload);

		// generate access token
		const accessToken = generateAccessToken(user);

		return {
			accessToken,
			refreshToken,
			user,
		};
	} catch (err) {
		console.error(err);
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed To Create Session', 'SessionCreationFailed');
	}
};

// refresh token
const refreshToken = async (token: string, req: Request) => {
	// check if the token provided or not
	if (!token) {
		throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized.!', 'UnauthorizedError');
	}

	// verify the token
	const decoded = verifyJwt(token, config.refresh_token_secret) as JwtPayload;
	const { _id: userId, jti } = decoded;

	// const session = await RefreshSession.findOne({ userId, jti });
	const session = await SessionServices.getSessionByJti(jti as string);

	if (!session) {
		throw new AppError(httpStatus.BAD_REQUEST, 'No Previous Active Session Were Found.!', 'InvalidOrRevokedSession');
	}

	// Convert the Date to a numeric timestamp for a valid comparison with Date.now().
	if (session.expiresAt.getTime() < Date.now()) {
		await SessionServices.revokeSession(jti as string);
		throw new AppError(httpStatus.BAD_REQUEST, 'Session Expired', 'SessionExpired');
	}

	await SessionServices.revokeSession(jti as string); // invalidate old session

	const user = await User.findById(userId);

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User Not Found', 'UserNotFound');
	}

	// generate new access token
	const newAccessToken = generateAccessToken(user);
	const { token: newRefreshToken, jti: newJti } = generateRefreshToken(user);

	const newSessionPayload: RefreshSessionType = {
		userId: userId,
		jti: newJti,
		ip: req.ip,
		userAgent: req.headers['user-agent'],
		expiresAt: new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS),
	};

	await SessionServices.createSession(newSessionPayload);

	return {
		newAccessToken,
		newRefreshToken,
	};
};

// logout
const logoutUser = async (token: string) => {
	if (!token) {
		throw new AppError(httpStatus.UNAUTHORIZED, 'You Are Not Authorized.!', 'UnauthorizedError');
	}

	const decoded = verifyJwt(token, config.refresh_token_secret) as JwtPayload;

	const { jti } = decoded;

	await SessionServices.revokeSession(jti as string);
};

export const AuthServices = {
	loginUser,
	refreshToken,
	logoutUser,
};
