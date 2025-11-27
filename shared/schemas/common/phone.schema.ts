import { z } from 'zod';

export const PhoneSchema = z
	.string()
	.regex(/^[\d\s\-\+\(\)]+$/, 'Please enter a valid phone number')
	.min(10, 'Phone number too short')
	.max(20, 'Phone number too long')
	.trim();

export type PhoneType = z.infer<typeof PhoneSchema>;
