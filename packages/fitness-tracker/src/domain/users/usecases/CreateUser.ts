import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';
import bcrypt from 'bcryptjs';

export class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: User): Promise<User> {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password!, saltRounds);
      userData.password = hashedPassword;
      const createdUser = await this.userRepository.create(userData);
      return createdUser;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
      throw error;
    }
  }
}