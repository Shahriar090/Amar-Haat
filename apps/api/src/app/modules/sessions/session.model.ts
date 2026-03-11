import type { SessionRefreshDocument } from '@/app/modules/sessions/sessions.interface';
import { model, Schema } from 'mongoose';

export const RefreshSessionSchema = new Schema<SessionRefreshDocument>({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
		index: true,
	},
	jti: { type: String, required: true, unique: true, index: true },
	ip: String,
	userAgent: String,
	issuedAt: { type: Date, default: Date.now },
	expiresAt: { type: Date, required: true },
});

RefreshSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshSession = model<SessionRefreshDocument>('RefreshSession', RefreshSessionSchema);
