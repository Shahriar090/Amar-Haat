import { AuthSchema } from '@shared/schemas/auth/auth.schema.js';
import express, { type Router } from 'express';
import validateRequest from '../../middlewares/validate_request.js';
import { AuthControllers } from './auth.controllers.js';
const router: Router = express.Router();

router.route('/login').post(validateRequest(AuthSchema), AuthControllers.loginUser);
router.route('/refresh-token').post(AuthControllers.refreshToken);

export const AuthRoutes = router;
