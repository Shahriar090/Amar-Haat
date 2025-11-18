import type { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncHandler = (func: RequestHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(func(req, res, next)).catch((err) => {
			next(err);
		});
	};
};

export default asyncHandler;

// This is a higher-order function that takes another Express route handler as a parameter.
// It returns a new anonymous function (a wrapper).
// Inside this wrapper, Promise.resolve() is used to convert the handler’s result into a Promise.
// If the handler throws an error or returns a rejected Promise, the .catch block catches it and
// forwards the error to the global Express error handler using next(err).
