import { courseServices } from './course.service';
import sendResponse from '../utils/sendRequest';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Course created succesfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = req.query;

  const queryParams: Record<string, any> = {
    page: Number(page) || 1,
    limit: Number(limit) || 10,
    sortBy: sortBy ? sortBy : 'startDate',
    sortOrder: sortOrder,
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  };

  const result = await courseServices.getAllCourseFromDB(queryParams);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Courses retrieved successfully',
    meta: {
      page: queryParams.page,
      limit: queryParams.limit,
      total: result.length,
    },
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated succesfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  updateCourse,
};
