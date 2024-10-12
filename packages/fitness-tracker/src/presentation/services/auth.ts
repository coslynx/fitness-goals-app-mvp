"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management
import AuthService from "@/infrastructure/authentication/services/AuthService";
import { User } from "@/domain/users/entities/User";

/**
 * @file packages/fitness-tracker/src/presentation/services/auth.ts
 * @description Service for handling user authentication and authorization.
 * @author CosLynxAI
 */

/**
 * @description Service for managing user authentication and authorization.
 */
export class AuthService {
  /**
   * @description Registers a new user account.
   * @param {User} userData The user data to create.
   * @returns {Promise<User>} The newly created user.
   */
  async register(userData: User): Promise<User> {
    try {
      const authService = new AuthService();
      const createdUser = await authService.register(userData);
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to register user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Authenticates a user with the provided email and password.
   * @param {string} email The user's email address.
   * @param {string} password The user's password.
   * @returns {Promise<User | null>} The authenticated user, or null if authentication fails.
   */
  async login(email: string, password: string): Promise<User | null> {
    try {
      const authService = new AuthService();
      const user = await authService.login(email, password);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to log in: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Creates a JWT token for the given user.
   * @param {User} user The user for whom to generate the token.
   * @returns {Promise<string>} The JWT token.
   */
  async generateToken(user: User): Promise<string> {
    try {
      const authService = new AuthService();
      const token = await authService.generateToken(user);
      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate token: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Verifies user authentication and authorizes access to specific API endpoints.
   * @param {NextApiRequest} req The incoming API request.
   * @param {NextApiResponse} res The API response.
   * @param {Function} next The next middleware function.
   * @returns {Promise<void>} Resolves after authentication and authorization are complete.
   */
  static async authenticate(
    req: NextApiRequest,
    res: NextApiResponse,
    next: Function
  ): Promise<void> {
    try {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Attach the user ID to the request for downstream access
      req.userId = session.user.id;

      next();
    } catch (error) {
      console.error("Authentication middleware error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}