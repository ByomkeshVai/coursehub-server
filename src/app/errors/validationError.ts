import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const validateError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessage = Object.values(err.errors).map(
    (err: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return `${err?.path[err.path.length - 1]} is ${err.message}`;
    },
  ).join(', ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};

export default validateError;
