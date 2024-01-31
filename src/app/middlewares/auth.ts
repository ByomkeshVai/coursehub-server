import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../user/user.model';
import UnAuthorize from '../errors/unauthorizedError';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new UnAuthorize('Unauthorized Access');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // console.log(decoded);

    // const { username, role, email, iat, exp } = decoded;
    const { email, role, iat } = decoded;

    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Unauthorized Access');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new UnAuthorize('Unauthorized Access');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new UnAuthorize('Unauthorized Access.');
    }

    req.user = decoded as JwtPayload & {
      role: string;
      _id: string;
      email: string;
      iat: string;
      exp: string;
    };

    next();
  });
};

export default auth;
