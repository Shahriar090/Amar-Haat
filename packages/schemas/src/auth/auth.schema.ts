import { z } from 'zod';
import { EmailSchema, PasswordSchema } from '../common';

export const AuthSchema = z.object({
	body: z.object({
		email: EmailSchema,
		password: PasswordSchema,
		ip: z.string().optional(),
		userAgent: z.string().optional(),
	}),
});
