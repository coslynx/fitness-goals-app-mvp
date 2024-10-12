import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Session } from "next-auth";
import { User } from "../../../domain/users/entities/User";
import { CreateUser } from "../../../domain/users/usecases/CreateUser";
import { UserRepository } from "../../../domain/users/repositories/UserRepository";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * @file packages/fitness-tracker/src/infrastructure/authentication/services/AuthService.ts
 * @description Service for managing user authentication and session management.
 * @author CosLynxAI
 */
export default class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * @description Registers a new user account.
   * @param {User} userData The user data to create.
   * @returns {Promise<User>} The newly created user.
   */
  async register(userData: User): Promise<User> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password!, saltRounds);
      userData.password = hashedPassword;

      const createUser = new CreateUser(this.userRepository);
      const createdUser = await createUser.execute(userData);
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
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("User not found.");
      }

      const isValidPassword = await bcrypt.compare(password, user.password!);
      if (!isValidPassword) {
        throw new Error("Incorrect password.");
      }

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
      const token = await NextAuth.jwt({
        user: { id: user.id, email: user.email },
      });
      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate token: ${error.message}`);
      }
      throw error;
    }
  }
}