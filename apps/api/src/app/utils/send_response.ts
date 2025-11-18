import type { Response } from 'express';

type ResponseType<T> = {
	statusCode: number;
	success: boolean;
	message?: string;
	data: T;
};

const sendResponse = <T>(res: Response, data: ResponseType<T>) => {
	res.status(data?.statusCode).json({
		statusCode: data?.statusCode,
		success: data?.success,
		message: data?.message,
		data: data?.data,
	});
};

export default sendResponse;

// This utility function ensures that all API responses follow a consistent structure.
// The generic <T> allows the `data` field to carry any type (object, array, string, etc.)
// while preserving type safety. The `data` parameter must match the ResponseType<T> shape,
// and the function sends this standardized response to the client.
