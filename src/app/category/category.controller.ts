import { CategoryServices } from './category.service';
import sendResponse from '../utils/sendRequest';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created succesfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
