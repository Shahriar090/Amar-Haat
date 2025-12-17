import { env } from '@/app/config/validate_env';

export default {
	port: env.PORT,
	db_uri: env.MONGODB_URI,
	node_env: env.NODE_ENV,
	bcrypt_salt_round: env.BCRYPT_SALT_ROUND,
	access_token_secret: env.ACCESS_TOKEN_SECRET,
	access_token_expiry: env.ACCESS_TOKEN_EXPIRY,
	refresh_token_secret: env.REFRESH_TOKEN_SECRET,
	refresh_token_expiry: env.REFRESH_TOKEN_EXPIRY,
};
