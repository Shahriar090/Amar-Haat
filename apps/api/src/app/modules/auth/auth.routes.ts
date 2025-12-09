import validateRequest from '@api/src/app/middlewares/validate_request.js';
import { AuthControllers } from '@api/src/app/modules/auth/auth.controllers.js';
import { AuthSchema } from '@shared/schemas/auth/auth.schema.js';
import express, { type Router } from 'express';
const router: Router = express.Router();

router.route('/login').post(validateRequest(AuthSchema), AuthControllers.loginUser);
router.route('/refresh-token').post(AuthControllers.refreshToken);

export const AuthRoutes = router;
