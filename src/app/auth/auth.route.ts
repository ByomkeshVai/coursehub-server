import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { UserValidations } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidations.createUserSchemaValidation),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
