import { ErrorRequestHandler } from 'express';
import { ApiError } from '../errors/ApiError';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Unpredictable error occurred' });
};
