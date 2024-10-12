import { GoalRepository } from '../../repositories/GoalRepository';

export class DeleteGoal {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(goalId: string): Promise<void> {
    try {
      await this.goalRepository.delete(goalId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete goal: ${error.message}`);
      }
      throw error;
    }
  }
}