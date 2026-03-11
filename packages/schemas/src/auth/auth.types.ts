import type { z } from 'zod';
import type { AuthFlatSchema, AuthSchema } from '../auth/auth.schema';

export type AuthType = z.infer<typeof AuthSchema>;
export type AuthPayloadType = z.infer<typeof AuthFlatSchema>;
