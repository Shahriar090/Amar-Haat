import express, { type Router } from 'express';

import validateRequest from '@/app/middlewares/validate_request';
import { UserControllers } from '@/app/modules/user/user.controllers';
import { CreateUserServerReqSchema, UpdateUserServerReqSchema } from '@amar-haat/schemas';
import { AddAddressRequestSchema, updateAddressSchema } from '@amar-haat/schemas';
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

router.route('/remove-address/:userId/address/:addressId').delete(UserControllers.removeAddress);

export const UserRoutes = router;
