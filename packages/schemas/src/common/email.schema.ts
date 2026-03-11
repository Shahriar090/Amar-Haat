import { z } from 'zod';

export const EmailSchema = z.email('Please enter a valid email').toLowerCase().trim();

export type EmailType = z.infer<typeof EmailSchema>;
