import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (payload: TUser) => {
  if (await User.isUserExists(payload.email, payload.username)) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User Already Exists');
  }

  const newUser = await User.create(payload);
  return newUser;
};

export const UserServices = {
  registerUserIntoDB,
};
