import type { z } from 'zod';
import type { AuthSchema } from './auth.schema.js';

export type AuthType = z.infer<typeof AuthSchema>;
