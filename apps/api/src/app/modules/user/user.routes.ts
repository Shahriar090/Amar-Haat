import { AddAddressRequestSchema } from '@shared/schemas/user/address/add.address.schema.js';
import { updateAddressSchema } from '@shared/schemas/user/address/update.address.schema.js';
import { CreateUserServerReqSchema } from '@shared/schemas/user/server/create.user.req.schema.js';
import { UpdateUserServerReqSchema } from '@shared/schemas/user/server/update.user.req.schema.js';
import express, { type Router } from 'express';
import validateRequest from '../../middlewares/validate_request.js';
import { UserControllers } from './user.controllers.js';
const router: Router = express.Router();

router.route('/create-user').post(validateRequest(CreateUserServerReqSchema), UserControllers.createUser);
router.route('/:id').get(UserControllers.getUser);
router.route('/').get(UserControllers.getAllUsers);
router.route('/update/:id').put(validateRequest(UpdateUserServerReqSchema), UserControllers.updateUser);
router.route('/delete/:id').delete(UserControllers.deleteUser);
router.route('/add-address/:id').post(validateRequest(AddAddressRequestSchema), UserControllers.addAddress);
router
	.route('/update-address/:userId/address/:addressId')
	.patch(validateRequest(updateAddressSchema), UserControllers.updateAddress);

export const UserRoutes = router;
