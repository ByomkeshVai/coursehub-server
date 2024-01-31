import httpStatus from 'http-status';
import { TCategory } from './category.interface';
import Category from './category.model';
import AppError from '../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';

const createCategoryDB = async (userData: JwtPayload, payload: TCategory) => {
  const userId = userData._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  payload.createdBy = user._id;

  const result = await Category.create(payload);

  return result;
};

const getAllCategoryFromDB = async () => {
  try {
    const result = await Category.find({}).populate({
      path: 'createdBy',
      select: '_id username email role',
    });
    return { categories: result };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const CategoryServices = {
  createCategoryDB,
  getAllCategoryFromDB,
};
