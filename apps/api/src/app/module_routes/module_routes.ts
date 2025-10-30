import express, { type Router } from 'express';
const router: Router = express.Router();

type ModuleRoute = {
	path: string;
	route: Router;
};

const moduleRoutes: ModuleRoute[] = [
	{
		path: '/',
		route: null,
	},
];

moduleRoutes.forEach(({ path, route }) => {
	router.use(path, route);
});

export default router;
