import type { NextFunction, Request, Response } from 'express';

// biome-ignore lint/suspicious/noExplicitAny: <WIll add proper error type later>
const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
	const statusCode = 500;
	const message = err.message || 'Something went wrong! Error handled by global error handler';

	return res.status(statusCode).json({
		success: false,
		message,
		error: err,
	});
};

export default globalErrorHandler;
