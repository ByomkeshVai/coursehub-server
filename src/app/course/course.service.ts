import httpStatus from 'http-status';
import Category from '../category/category.model';
import { GetAllCoursesParams, TCourse } from '../course/course.interface';
import { Course } from '../course/course.model';
import AppError from '../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';

const createCourseDB = async (userData: JwtPayload, payload: TCourse) => {
  const categoryName = await Category.findById(payload.categoryId);

  if (!categoryName) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
  }

  const userId = userData._id;

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  payload.createdBy = user._id;

  const result = await Course.create(payload);

  return result;
};

const getAllCourseFromDB = async (
  params: Partial<GetAllCoursesParams> = {},
) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'startDate',
    sortOrder = 'asc',
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = params;

  try {
    let query = Course.find().populate({
      path: 'createdBy',
      select: '_id username email role',
    });

    if (minPrice !== undefined && maxPrice !== undefined) {
      query = query.where('price').gte(minPrice).lte(maxPrice);
    }

    if (tags) {
      query = query.where('tags.name').equals(tags);
    }

    if (startDate && endDate) {
      const dateFilter = {
        $and: [
          { startDate: { $gte: startDate } },
          { endDate: { $lte: endDate } },
        ],
      };
      query = query.where(dateFilter);
    }

    if (language) {
      query = query.where('language').equals(language);
    }

    if (provider) {
      query = query.where('provider').equals(provider);
    }

    if (durationInWeeks !== undefined) {
      query = query.where('durationInWeeks').equals(durationInWeeks);
    }

    if (level) {
      query = query.where('details.level').equals(level);
    }

    if (sortBy === 'endDate') {
      query = query.sort({ endDate: 'desc' });
    } else {
      query = query.sort({ [sortBy]: sortOrder });
    }

    query = query.skip((page - 1) * limit).limit(limit);

    const result = await query.exec();
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to fetch courses');
  }
};

const updateCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>,
) => {
  const { details, tags, ...courseOtherData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...courseOtherData,
  };

  try {
    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedUpdatedData[`details.${key}`] = value;
      }
    }

    const updateBasicInfo = await Course.findByIdAndUpdate(
      courseId,
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateBasicInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
    }

    if (tags && tags.length > 0) {
      const deleteTags = tags
        .filter((tag) => tag.name && tag.isDeleted)
        .map((tag) => tag.name);

      const deletedTagsFromCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            tags: { name: { $in: deleteTags } },
          },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!deletedTagsFromCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }

      const newTags = tags?.filter((tag) => tag.name && !tag.isDeleted);
      const newTagsCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (!newTagsCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update tags!');
      }
    }

    const result = await Course.findById(courseId)
      .populate('tags.name')
      .populate({
        path: 'createdBy',
        select: '_id username email role',
      });

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const courseServices = {
  createCourseDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
};
