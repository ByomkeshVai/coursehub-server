import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { courseController } from './course.controller';
import { ReviewController } from '../review/review.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequest(CourseValidations.CreateCourseValidationSchema),
  auth(USER_ROLE.admin),
  courseController.createCourse,
);
router.put(
  '/:courseId',
  validateRequest(CourseValidations.UpdateCourseValidationSchema),
  auth(USER_ROLE.admin),
  courseController.updateCourse,
);

router.get('/:courseId/reviews', ReviewController.CourseIDByReview);
router.get('/best', ReviewController.getBestReviewCourse);

router.get('/', courseController.getAllCourse);

export const CourseRoutes = router;
