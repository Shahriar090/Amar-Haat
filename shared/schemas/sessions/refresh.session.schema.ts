import { Types } from 'mongoose';
import { z } from 'zod';

export const RefreshSessionSchema = z.object({
	userId: z
		.string()
		.length(24)
		.regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
		.transform((val) => new Types.ObjectId(val)),
	jti: z.string().min(1).max(255),
	ip: z.string().optional().or(z.literal(undefined)),
	userAgent: z.string().max(500).optional().or(z.literal(undefined)),
	issuedAt: z.date().optional(),
	expiresAt: z.date(),
});
