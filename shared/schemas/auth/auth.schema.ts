import { z } from 'zod';
import { EmailSchema } from '../common/email.schema.js';
import { PasswordSchema } from '../common/password.schema.js';

export const AuthSchema = z.object({
	body: z.object({
		email: EmailSchema,
		password: PasswordSchema,
		ip: z.string().optional(),
		userAgent: z.string().optional(),
	}),
});
