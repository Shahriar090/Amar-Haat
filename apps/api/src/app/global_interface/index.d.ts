/** biome-ignore-all lint/style/noNamespace: <will try a better approach later to fix this namespace issue> */
import type { JwtPayload } from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			user: JwtPayload;
		}
	}
}
