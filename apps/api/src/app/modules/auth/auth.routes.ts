import validateRequest from '@/app/middlewares/validate_request';
import { AuthControllers } from '@/app/modules/auth/auth.controllers';
import express, { type Router } from 'express';
import { AuthSchema } from '../../../../../../shared/schemas/auth/auth.schema';
const router: Router = express.Router();

router.route('/login').post(validateRequest(AuthSchema), AuthControllers.loginUser);
router.route('/refresh-token').post(AuthControllers.refreshToken);

export const AuthRoutes = router;
