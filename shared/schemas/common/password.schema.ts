import { z } from 'zod';

export const PasswordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.max(100)
	.regex(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
		'Password must contain at least one uppercase letter, one lowercase letter, and one number',
	);

export type PasswordType = z.infer<typeof PasswordSchema>;
