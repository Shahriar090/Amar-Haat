class AppError extends Error {
	public readonly statusCode: number; //http status code
	public readonly type?: string; //error type

	constructor(statusCode: number, message: string, type?: string, stack?: string) {
		super(message);
		this.statusCode = statusCode;
		this.type = type as string;

		// assign custom or captured stack trace
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default AppError;
