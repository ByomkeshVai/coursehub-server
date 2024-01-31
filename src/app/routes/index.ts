import { Router } from 'express';
import { CategoryRoutes } from '../category/category.route';
import { CourseRoutes } from '../course/course.route';
import { ReviewRoutes } from '../review/review.route';
import { AuthRoutes } from '../auth/auth.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
