import { AuthRoutes } from '@api/src/app/modules/auth/auth.routes.js';
import { UserRoutes } from '@api/src/app/modules/user/user.routes.js';
import express, { type Router } from 'express';
const router: Router = express.Router();

type ModuleRoute = {
	path: string;
	route: Router;
};

const moduleRoutes: ModuleRoute[] = [
	{
		path: '/users',
		route: UserRoutes,
	},
	{
		path: '/auth',
		route: AuthRoutes,
	},
];

moduleRoutes.forEach(({ path, route }) => {
	router.use(path, route);
});

export default router;
