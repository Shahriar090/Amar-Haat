import type z from 'zod';
import type { CreateUserServerReqSchema } from './create.user.req.schema';
import type { CreateUserServerSchema } from './user.create.server.schema';

export type CreateUserServerType = z.infer<typeof CreateUserServerSchema>;
export type CreateUserServerReqType = z.infer<typeof CreateUserServerReqSchema>;
