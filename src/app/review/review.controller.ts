import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import { reviewServices } from './review.service';
import sendResponse from '../utils/sendRequest';

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Review created succesfully',
    data: result,
  });
});

const getAllReview = catchAsync(async (req, res) => {
  const result = await reviewServices.getAllReviewFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const CourseIDByReview = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await reviewServices.CourseIDByReviewDB(courseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});

const getBestReviewCourse = catchAsync(async (req, res) => {
  const course = await reviewServices.bestCourseReviewDB();

  const result = {
    course,
  };

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Best course retrieved successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReview,
  CourseIDByReview,
  getBestReviewCourse,
};
