import type { CreateUserServerReqSchema } from 'packages/schemas/src/user/server/create.user.req.schema';
import type { UpdateUserServerReqSchema } from 'packages/schemas/src/user/server/update.user.req.schema';
import type { CreateUserServerSchema } from 'packages/schemas/src/user/server/user.create.server.schema';
import type { UpdateUserServerSchema } from 'packages/schemas/src/user/server/user.update.server.schema';
import type z from 'zod';

export type CreateUserServerType = z.infer<typeof CreateUserServerSchema>;
export type CreateUserServerReqType = z.infer<typeof CreateUserServerReqSchema>;
export type UpdateUserServerType = z.infer<typeof UpdateUserServerSchema>;
export type UpdateUserServerReqType = z.infer<typeof UpdateUserServerReqSchema>;
