import validateRequest from '@/app/middlewares/validate_request';
import { AuthControllers } from '@/app/modules/auth/auth.controllers';
import { AuthSchema } from '@amar-haat/schemas';
import express, { type Router } from 'express';
const router: Router = express.Router();

router.route('/login').post(validateRequest(AuthSchema), AuthControllers.loginUser);
router.route('/refresh-token').post(AuthControllers.refreshToken);

export const AuthRoutes = router;
