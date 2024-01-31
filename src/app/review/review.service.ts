import httpStatus from 'http-status';
import { Course } from '../course/course.model';
import TReview from './review.interface';
import Review from './review.model';
import AppError from '../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';

const createReviewDB = async (userData: JwtPayload, payload: TReview) => {
  const courseName = await Course.findById(payload.courseId);

  if (!courseName) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
  }

  const userId = userData._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  payload.createdBy = user._id;

  const result = await Review.create(payload);

  const populatedResult = await result.populate({
    path: 'createdBy',
    select: '_id username email role',
  });

  return populatedResult;
};

const getAllReviewFromDB = async () => {
  try {
    const result = await Review.find().populate({
      path: 'createdBy',
      select: '_id username email role',
    });
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const CourseIDByReviewDB = async (courseId: string) => {
  try {
    const courseFind = Course.findById(courseId).populate(
      'createdBy',
      '_id username email role',
    );
    const reviewFind = Review.find({ courseId }).populate(
      'createdBy',
      '_id username email role',
    );

    const [course, reviews] = await Promise.all([courseFind, reviewFind]);

    if (!course) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Course not found');
    }

    // const mappedReviews = reviews.map((review) => ({
    //   review,
    // }));

    const result = {
      course: course,
      reviews: reviews.map((review: any) => review),
    };

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const bestCourseReviewDB = async () => {
  const coursesWithStats = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'createdBy',
        foreignField: '_id',
        as: 'createdBy',
      },
    },
    {
      $unwind: '$createdBy',
    },
    {
      $project: {
        _id: 1,
        title: 1,
        instructor: 1,
        categoryId: 1,
        price: 1,
        tags: 1,
        startDate: 1,
        endDate: 1,
        language: 1,
        provider: 1,
        durationInWeeks: 1,
        details: 1,
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
        createdBy: {
          _id: '$createdBy._id',
          username: '$createdBy.username',
          email: '$createdBy.email',
          role: '$createdBy.role',
        },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);

  const bestCourse = coursesWithStats[0];

  return bestCourse;
};

export const reviewServices = {
  createReviewDB,
  getAllReviewFromDB,
  CourseIDByReviewDB,
  bestCourseReviewDB,
};
