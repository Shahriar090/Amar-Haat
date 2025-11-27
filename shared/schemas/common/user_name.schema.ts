import { z } from 'zod';

export const UserNameSchema = z.object({
	firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name too long').trim(),
	middleName: z.string().max(50).trim().optional(),
	lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name too long').trim(),
});

export type UserNameType = z.infer<typeof UserNameSchema>;
