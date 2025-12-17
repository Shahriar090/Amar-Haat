import { AuthRoutes } from '@/app/modules/auth/auth.routes';
import { UserRoutes } from '@/app/modules/user/user.routes';
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
