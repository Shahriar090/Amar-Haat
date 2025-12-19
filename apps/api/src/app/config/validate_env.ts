import { envValidationSchema } from '@/app/config/env_validation_schema';
import dotEnv from 'dotenv';
import path from 'node:path';

const NODE_ENV = process.env.NODE_ENV || 'development';

const baseEnv = path.resolve(process.cwd(), '.env');
const envSpecific = path.resolve(process.cwd(), `.env.${NODE_ENV}`);
const localOverride = path.resolve(process.cwd(), '.env.local');
const envLocalOverride = path.resolve(process.cwd(), `.env.${NODE_ENV}.local`);

dotEnv.config({ path: baseEnv, override: true });
dotEnv.config({ path: envSpecific, override: true });
dotEnv.config({ path: localOverride, override: true });
dotEnv.config({ path: envLocalOverride, override: true });

const parsedEnv = envValidationSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error('Invalid environment variables:\n');
	parsedEnv.error.issues.forEach((issue) => {
		const key = issue.path.join('.') || '(root)';
		console.error(` . ${key} => ${issue.message}`);
	});
	console.error('\n');
	process.exit(1);
}

export const env = parsedEnv.data;
