import { z } from 'zod';

// const NODE_ENV = process.env.NODE_ENV || 'development'
const numEnv = () => z.preprocess((val) => Number(val), z.number().int());

export const envValidationSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']),
	PORT: numEnv(),
	MONGODB_URI: z.string(),
	BCRYPT_SALT_ROUND: numEnv(),
	ACCESS_TOKEN_SECRET: z.string(),
	ACCESS_TOKEN_EXPIRY: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_EXPIRY: z.string(),
});
