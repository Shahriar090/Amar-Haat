import globalErrorHandler from '@/app/middlewares/global_error_handler';
import notFound from '@/app/middlewares/not_found';
import router from '@/app/module_routes/module_routes';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { type Application, type Request, type Response } from 'express';
// import notFound from './app/middlewares/not_found.js';
// import router from './app/module_routes/module_routes.js';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// allowed origins
const allowedOrigins = ['http://localhost:5173'];

app.use(
	cors({
		origin: allowedOrigins,
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
	}),
);

// application routes
app.use('/api/v1', router);

app.get('/', (_req: Request, res: Response) => {
	res.send('Hello from amar-haat server.!');
});

// error test endpoint
app.get('/test-error', (_req, _res, next) => {
	const err = new Error('This is a test error');
	next(err);
});

// not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);
export default app;
