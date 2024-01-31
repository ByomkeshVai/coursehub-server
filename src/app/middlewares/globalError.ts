/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';
import handleCastError from '../errors/castError';
import duplicateError from '../errors/duplicateError';
import validateError from '../errors/validationError';
import zodError from '../errors/zodError';
import UnAuthorize from '../errors/unauthorizedError';
import DulicatePassword from '../errors/duplicatePasswordError';

const globalError: ErrorRequestHandler = (errorDetails, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';

  let errorMessage;

  if (errorDetails instanceof ZodError) {
    const simplifiedError = zodError(errorDetails);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (errorDetails?.name === 'ValidationError') {
    const simplifiedError = validateError(errorDetails);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorSources;
  } else if (errorDetails?.name === 'CastError') {
    const simplifiedError = handleCastError(errorDetails);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorSources;
  } else if (errorDetails?.code == 11000) {
    const simplifiedError = duplicateError(errorDetails);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorSources;
  } else if (errorDetails instanceof AppError) {
    statusCode = errorDetails?.statusCode;
    message = errorDetails.message;
    errorMessage = errorDetails.message;
  } else if (errorDetails instanceof UnAuthorize) {
    message = 'Unauthorized Access';
    errorMessage =
      'You do not have the necessary permissions to access this resource.';
    errorDetails = null;
  } else if (errorDetails instanceof DulicatePassword) {
    statusCode = errorDetails?.statusCode;
    message = errorDetails.message;
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: errorDetails.data || null,
    });
  } else if (errorDetails.name === 'JsonWebTokenError') {
    message = 'Unauthorized Access';
    errorMessage =
      'You do not have the necessary permissions to access this resource.';
    errorDetails = null;
  } else if (errorDetails.name === 'TokenExpiredError') {
    message = 'Unauthorized Access';
    errorMessage =
      'You do not have the necessary permissions to access this resource.';
    errorDetails = null;
  } else if (errorDetails instanceof Error) {
    message = errorDetails.message;
    errorMessage = errorDetails.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: null,
  });
};

export default globalError;
