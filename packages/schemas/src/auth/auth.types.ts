import type { z } from 'zod';
import type { AuthSchema } from '../auth/auth.schema';

export type AuthType = z.infer<typeof AuthSchema>;
