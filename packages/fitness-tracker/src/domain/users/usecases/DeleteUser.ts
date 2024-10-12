import { UserRepository } from '../../repositories/UserRepository';

export class DeleteUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    try {
      await this.userRepository.delete(userId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete user: ${error.message}`);
      }
      throw error;
    }
  }
}