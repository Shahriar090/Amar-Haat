import type { z } from 'zod';
import type { RefreshSessionSchema } from './refresh.session.schema.js';

export type RefreshSessionType = z.infer<typeof RefreshSessionSchema>;
