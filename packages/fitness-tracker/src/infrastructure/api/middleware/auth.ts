import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

/**
 * @file packages/fitness-tracker/src/infrastructure/api/middleware/auth.ts
 * @description Middleware for authenticating API requests.
 * @author CosLynxAI
 */

/**
 * @description Middleware function that verifies user authentication.
 * @param {NextApiRequest} req The incoming API request.
 * @param {NextApiResponse} res The API response.
 * @param {Function} next The next middleware function.
 */
export const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
): Promise<void> => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Attach the user ID to the request for downstream access
    req.userId = session.user.id;

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};