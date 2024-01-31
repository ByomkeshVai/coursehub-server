import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const castError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources = `${err.value} is not a valid ID!`
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default castError;
