import config from '@/app/config';
import AppError from '@/app/errors/app_error';
import {
	generateAccessToken,
	generateRefreshToken,
	REFRESH_TOKEN_MAX_AGE_MS,
	verifyJwt,
} from '@/app/modules/auth/auth.utils';

import { SessionServices } from '@/app/modules/sessions/sessions.services';
import { User } from '@/app/modules/user/user.model';
import type { AuthType, RefreshSessionType } from '@amar-haat/schemas';
import type { Request } from 'express';
import httpStatus from 'http-status';
import type { JwtPayload } from 'jsonwebtoken';
import type { Types } from 'mongoose';

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
	// jti = Json Web Token Id
	const { token: refreshToken, jti } = generateRefreshToken(user);

	const expiresAt = new Date(Date.now() + REFRESH_TOKEN_MAX_AGE_MS);

	const sessionPayload: RefreshSessionType = {
		userId: user._id as Types.ObjectId,
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

export const AuthServices = {
	loginUser,
	refreshToken,
};
