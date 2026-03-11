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

// creating a flat version of AuthSchema (removing the body layer) to use in auth payload for type safety

export const AuthFlatSchema = AuthSchema.transform((data) => ({
	email: data.body.email,
	password: data.body.password,
	ip: data.body.ip,
	userAgent: data.body.userAgent,
}));
