import type {
	AddressType,
	CreateUserServerType,
	UpdateAddressServerType,
	UpdateUserServerType,
} from '@aamarhaat/shared';
import type { IUserDocument } from './user.interface.js';
import { User } from './user.model.js';

export const UserDataSource = {
	// create user
	createUser: async (payload: CreateUserServerType): Promise<IUserDocument> => {
		const newUser = await User.create(payload);
		return newUser;
	},

	// get a single user
	getUser: async (id: string): Promise<IUserDocument | null> => {
		return await User.findById(id);
	},

	// get all users
	getAllUsers: async (): Promise<IUserDocument[]> => {
		return await User.find();
	},

	// update a user
	updateUserInfo: async (id: string, payload: UpdateUserServerType): Promise<IUserDocument | null> => {
		return await User.findByIdAndUpdate(id, payload, { new: true });
	},

	// delete a user
	deleteUser: async (id: string): Promise<IUserDocument | null> => {
		return await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
	},

	// address related functions

	// add address
	addAddress: async (id: string, address: AddressType[]) => {
		return User.findByIdAndUpdate(id, { $push: { address: { $each: address } } }, { new: true, runValidators: true });
	},

	// update address
	updateAddress: async (userId: string, addressId: string, payload: UpdateAddressServerType) => {
		const updateOperation: Record<string, unknown> = {};

		for (const key of Object.keys(payload) as (keyof typeof payload)[]) {
			const value = payload[key];
			if (value !== undefined) {
				updateOperation[`address.$[addr].${key}`] = value;
			}
		}

		const updatedAddress = await User.findByIdAndUpdate(
			userId,
			{ $set: updateOperation }, // dynamic update
			{
				new: true,
				runValidators: true,
				arrayFilters: [
					{
						'addr._id': addressId,
					},
				],
			},
		);

		return updatedAddress;
	},

	// remove address
	removeAddress: async (userId: string, addressId: string) => {
		return User.findByIdAndUpdate(userId, { $pull: { address: { _id: addressId } } }, { new: true });
	},
};
