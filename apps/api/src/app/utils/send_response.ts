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
