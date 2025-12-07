import type { RefreshSessionType } from '@shared/schemas/sessions/refresh.session.types.js';
import { RefreshSession } from './session.model.js';
import type { SessionRefreshDocument } from './sessions.interface.js';

// create session
const createSession = async (payload: RefreshSessionType): Promise<SessionRefreshDocument> => {
	const session = await RefreshSession.create({
		userId: payload.userId,
		jti: payload.jti,
		ip: payload.ip,
		userAgent: payload.userAgent,
		expiresAt: payload.expiresAt,
	});

	return session;
};

// get session by jti (json web token id)
const getSessionByJti = async (jti: string): Promise<SessionRefreshDocument | null> => {
	const session = await RefreshSession.findOne({ jti }).populate('userId');
	return session;
};

// delete a session (revoke)
const revokeSession = async (jti: string) => {
	const deletedSession = await RefreshSession.deleteOne({ jti });
	return deletedSession;
};

// optional for now(delete all sessions / logout from all device)
const revokeAllUserSessions = async (userId: string) => {
	const deletedSessions = await RefreshSession.deleteMany({ userId });
	return deletedSessions;
};

export const SessionServices = {
	createSession,
	getSessionByJti,
	revokeSession,
	revokeAllUserSessions,
};
