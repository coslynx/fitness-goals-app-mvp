import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

export class UpdateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string, userData: Partial<User>): Promise<User> {
    try {
      const existingUser = await this.userRepository.findById(userId);

      if (!existingUser) {
        throw new Error(`User with ID ${userId} not found.`);
      }

      existingUser.update(userData);
      await this.userRepository.update(userId, existingUser);

      return existingUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update user: ${error.message}`);
      }
      throw error;
    }
  }
}