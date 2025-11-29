import { CreateUserServerReqSchema } from '@shared/schemas/user/server/create.user.req.schema.js';
import express, { type Router } from 'express';
import validateRequest from '../../middlewares/validate_request.js';
import { UserControllers } from './user.controllers.js';
const router: Router = express.Router();

router.route('/create-user').post(validateRequest(CreateUserServerReqSchema), UserControllers.createUser);

export const UserRoutes = router;
