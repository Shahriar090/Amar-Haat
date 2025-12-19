import express, { type Router } from 'express';

import validateRequest from '@/app/middlewares/validate_request';
import { UserControllers } from '@/app/modules/user/user.controllers';
import { CreateUserServerReqSchema, UpdateUserServerReqSchema } from '@amar-haat/schemas';
const router: Router = express.Router();

router.route('/create-user').post(validateRequest(CreateUserServerReqSchema), UserControllers.createUser);
router.route('/:id').get(UserControllers.getUser);
router.route('/').get(UserControllers.getAllUsers);
router.route('/update/:id').put(validateRequest(UpdateUserServerReqSchema), UserControllers.updateUser);
router.route('/delete/:id').delete(UserControllers.deleteUser);

export const UserRoutes = router;
