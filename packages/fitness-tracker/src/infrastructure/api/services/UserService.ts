import { User } from '../../../domain/users/entities/User';
import { UserRepository } from '../../../domain/users/repositories/UserRepository';
import { CreateUser } from '../../../domain/users/usecases/CreateUser';
import { UpdateUser } from '../../../domain/users/usecases/UpdateUser';
import { DeleteUser } from '../../../domain/users/usecases/DeleteUser';
import bcrypt from 'bcryptjs';

/**
 * @file packages/fitness-tracker/src/infrastructure/api/services/UserService.ts
 * @description Service for managing user accounts.
 * @author CosLynxAI
 */
export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * @description Creates a new user account.
   * @param {User} userData The user data to create.
   * @returns {Promise<User>} The newly created user.
   */
  async create(userData: User): Promise<User> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password!, saltRounds);
      userData.password = hashedPassword;
      const createUser = new CreateUser(this.userRepository);
      const createdUser = await createUser.execute(userData);
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Finds a user by ID.
   * @param {string} userId The user ID to search for.
   * @returns {Promise<User | null>} The user with the specified ID, or null if no user is found.
   */
  async findById(userId: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(userId);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Finds all users.
   * @returns {Promise<User[]>} An array of all users.
   */
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find users: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Updates a user account.
   * @param {string} userId The user ID to update.
   * @param {Partial<User>} userData The updated user data.
   * @returns {Promise<User>} The updated user.
   */
  async update(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const updateUser = new UpdateUser(this.userRepository);
      const updatedUser = await updateUser.execute(userId, userData);
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Deletes a user account.
   * @param {string} userId The user ID to delete.
   * @returns {Promise<void>}
   */
  async delete(userId: string): Promise<void> {
    try {
      const deleteUser = new DeleteUser(this.userRepository);
      await deleteUser.execute(userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      throw error;
    }
  }
}