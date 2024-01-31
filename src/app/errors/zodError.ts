import { ZodError, ZodIssue } from 'zod';
import {TGenericErrorResponse } from '../interface/error';

const zodError = (err: ZodError) : TGenericErrorResponse => {
  const errorMessage = err.issues.map((issue: ZodIssue) => {
    return `${issue?.path[issue.path.length - 1]} is ${issue.message}`;
  }).join(', ');

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
  };
};

export default zodError;