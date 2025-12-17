import express, { type Router } from 'express';
import { CreateUserServerReqSchema } from '../../../../../../shared/schemas/user/server/create.user.req.schema.js';
import { UpdateUserServerReqSchema } from '../../../../../../shared/schemas/user/server/update.user.req.schema.js';
import validateRequest from '../../middlewares/validate_request.js';
import { UserControllers } from './user.controllers.js';
const router: Router = express.Router();

router.route('/create-user').post(validateRequest(CreateUserServerReqSchema), UserControllers.createUser);
router.route('/:id').get(UserControllers.getUser);
router.route('/').get(UserControllers.getAllUsers);
router.route('/update/:id').put(validateRequest(UpdateUserServerReqSchema), UserControllers.updateUser);
router.route('/delete/:id').delete(UserControllers.deleteUser);

export const UserRoutes = router;
