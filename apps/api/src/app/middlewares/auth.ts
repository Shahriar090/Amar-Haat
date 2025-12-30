import type { RoleType } from '@aamarhaat/shared';
import httpStatus from 'http-status';
import type { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import AppError from '../errors/app_error.js';
import { verifyJwt } from '../modules/auth/auth.utils.js';
import { RefreshSession } from '../modules/sessions/session.model.js';
import { User } from '../modules/user/user.model.js';
import asyncHandler from '../utils/async_handler.js';

const auth = (...requiredRoles: RoleType[]) => {
	return asyncHandler(async (req, _res, next) => {
		const accessToken = req.headers.authorization;
		const refreshToken = req.cookies?.refreshToken;

		if (!accessToken) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'Access Token Missing', 'Unauthorized');
		}

		if (!refreshToken) {
			throw new AppError(httpStatus.UNAUTHORIZED, 'Session cookie missing', 'NoSession');
		}

		try {
			const decodedAccessToken = verifyJwt(accessToken, config.access_token_secret) as JwtPayload;
			const decodedRefreshToken = verifyJwt(refreshToken, config.refresh_token_secret) as JwtPayload;

			const [user, currentSession] = await Promise.all([
				User.findById(decodedAccessToken._id).select('isActive isDeleted role'),
				RefreshSession.findOne({ jti: decodedRefreshToken.jti, userId: decodedAccessToken._id }),
			]);

			if (!currentSession) {
				throw new AppError(httpStatus.UNAUTHORIZED, 'Session Has Been Revoked', 'SessionInvalid');
			}

			if (!user || user.isDeleted) {
				throw new AppError(httpStatus.FORBIDDEN, 'Account No Longer Exists', 'UserNotFound');
			}

			if (!user.isActive) {
				throw new AppError(httpStatus.FORBIDDEN, 'Account Is Currently Blocked', 'BlockedUser');
			}

			if (requiredRoles.length > 0 && !requiredRoles.includes(decodedAccessToken.role as RoleType)) {
				throw new AppError(httpStatus.FORBIDDEN, 'Insufficient Permissions', 'UnauthorizedRole');
			}

			req.user = decodedAccessToken;
			next();
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				throw new AppError(httpStatus.UNAUTHORIZED, 'Token Expired', 'TokenExpired');
			}
			throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Security Tokens', 'InvalidToken');
		}
	});
};

export default auth;
