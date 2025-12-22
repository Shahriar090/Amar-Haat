import type z from 'zod';
import type { CreateUserServerReqSchema } from './create.user.req.schema.js';
import type { UpdateUserServerReqSchema } from './update.user.req.schema.js';
import type { CreateUserServerSchema } from './user.create.server.schema.js';
import type { UpdateUserServerSchema } from './user.update.server.schema.js';

export type CreateUserServerType = z.infer<typeof CreateUserServerSchema>;
export type CreateUserServerReqType = z.infer<typeof CreateUserServerReqSchema>;
export type UpdateUserServerType = z.infer<typeof UpdateUserServerSchema>;
export type UpdateUserServerReqType = z.infer<typeof UpdateUserServerReqSchema>;
