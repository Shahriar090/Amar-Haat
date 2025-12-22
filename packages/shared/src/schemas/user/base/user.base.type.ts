import type { z } from 'zod';
import type { BaseUserSchema } from './user.base.schema.js';

export type BaseUserType = z.infer<typeof BaseUserSchema>;
