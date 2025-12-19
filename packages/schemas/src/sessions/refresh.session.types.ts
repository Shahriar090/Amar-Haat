import type { z } from 'zod';
import type { RefreshSessionSchema } from '../sessions/refresh.session.schema';

export type RefreshSessionType = z.infer<typeof RefreshSessionSchema>;
