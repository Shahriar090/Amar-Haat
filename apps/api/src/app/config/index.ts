import { env } from './validate_env.js';

export default {
	port: env.PORT,
	db_uri: env.MONGODB_URI,
	node_env: env.NODE_ENV,
	bcrypt_salt_round: env.BCRYPT_SALT_ROUND,
};
