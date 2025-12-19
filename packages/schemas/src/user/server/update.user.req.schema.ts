import { z } from 'zod';
import { UpdateUserServerSchema } from './user.update.server.schema';

export const UpdateUserServerReqSchema = z.object({
	body: z.object({
		user: UpdateUserServerSchema,
	}),
});
