import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { ReviewValidations } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidations.CreateReviewValidation),
  auth(USER_ROLE.user),
  ReviewController.createReview,
);

router.get('/', ReviewController.getAllReview);

export const ReviewRoutes = router;
