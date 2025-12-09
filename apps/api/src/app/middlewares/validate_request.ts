import asyncHandler from '@api/src/app/utils/async_handler.js';

// biome-ignore lint/suspicious/noExplicitAny: <Using any for a temporary fix. Will use appropriate type later>
const validateRequest = (schema: any) => {
	return asyncHandler(async (req, _res, next) => {
		await schema.parseAsync({
			body: req.body,
			cookies: req.cookies,
		});
		next();
	});
};

export default validateRequest;
