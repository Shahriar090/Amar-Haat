import type { Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import config from '../../config/index.js';
import type { IUserDocument } from '../user/user.interface.js';

export const REFRESH_TOKEN_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const generateAccessToken = (user: IUserDocument): string => {
	return jwt.sign(
		{
			_id: user._id,
			role: user.role,
		},
		config.access_token_secret,
		{ expiresIn: '20m' },
	);
};

export const generateRefreshToken = (user: IUserDocument): { token: string; jti: string } => {
	// JTI (JWT ID) is a unique string used to reference the session in the DB
	const jti = uuidv4();

	return {
		token: jwt.sign(
			{
				_id: user._id,
				jti: jti,
			},
			config.refresh_token_secret,
			{ expiresIn: '7d' },
		),
		jti: jti,
	};
};

export const setCookie = (res: Response, token: string) => {
	res.cookie('refreshToken', token, {
		httpOnly: true,
		secure: config.node_env === 'production',
		sameSite: 'none',
		maxAge: REFRESH_TOKEN_MAX_AGE_MS,
	});
};

export const clearCookie = (res: Response, cookieName = 'refreshToken') => {
	res.clearCookie(cookieName, {
		httpOnly: true,
		secure: config.node_env === 'production',
		sameSite: 'none',
	});
};

export const verifyJwt = (token: string, secret: string) => {
	return jwt.verify(token, secret);
};
