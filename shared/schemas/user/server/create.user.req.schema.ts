import { z } from 'zod';
import { CreateUserServerSchema } from './user.create.server.schema';

export const CreateUserServerReqSchema = z.object({
	body: z.object({
		user: CreateUserServerSchema,
	}),
});
