import { CreateUserServerSchema } from './user.create.server.schema';

export const UpdateUserServerSchema = CreateUserServerSchema.extend({
	name: CreateUserServerSchema.shape.name.partial(),
})
	.omit({ password: true })
	.partial();
