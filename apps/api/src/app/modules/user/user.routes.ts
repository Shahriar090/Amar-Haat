import {
	AddAddressRequestSchema,
	CreateUserServerReqSchema,
	UpdateAddressreqSchema,
	UpdateUserServerReqSchema,
} from '@aamarhaat/shared';
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
	.patch(validateRequest(UpdateAddressreqSchema), UserControllers.updateAddress);

router.route('/remove-address/:userId/address/:addressId').delete(UserControllers.removeAddress);

export const UserRoutes = router;
