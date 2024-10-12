import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../../../errors/HttpException';

/**
 * @file packages/fitness-tracker/src/infrastructure/api/middleware/errorHandler.ts
 * @description Middleware for handling API errors and providing standardized responses.
 * @author CosLynxAI
 */

/**
 * @description Middleware for handling API errors.
 * @param {Error} err The error object.
 * @param {Request} req The request object.
 * @param {Response} res The response object.
 * @param {NextFunction} next The next middleware function.
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};