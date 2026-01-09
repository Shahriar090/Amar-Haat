import type z from 'zod';
import type { CreateUserServerReqSchema } from './create.user.req.schema';
import type { UpdateUserServerReqSchema } from './update.user.req.schema';
import type { CreateUserServerSchema } from './user.create.server.schema';
import type { UpdateUserServerSchema } from './user.update.server.schema';

export type CreateUserServerType = z.infer<typeof CreateUserServerSchema>;
export type CreateUserServerReqType = z.infer<typeof CreateUserServerReqSchema>;
export type UpdateUserServerType = z.infer<typeof UpdateUserServerSchema>;
export type UpdateUserServerReqType = z.infer<typeof UpdateUserServerReqSchema>;
