import express, { type Router } from 'express';
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
];

moduleRoutes.forEach(({ path, route }) => {
	router.use(path, route);
});

export default router;
