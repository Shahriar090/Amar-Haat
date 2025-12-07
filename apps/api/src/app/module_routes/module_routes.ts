import express, { type Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes.js';
import { UserRoutes } from '../modules/user/user.routes.js';
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
