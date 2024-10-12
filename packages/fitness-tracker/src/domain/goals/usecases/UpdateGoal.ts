import { GoalRepository } from '../../repositories/GoalRepository';
import { Goal } from '../../entities/Goal';

export class UpdateGoal {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(goalId: string, goalData: Partial<Goal>): Promise<Goal> {
    try {
      const existingGoal = await this.goalRepository.findById(goalId);

      if (!existingGoal) {
        throw new Error(`Goal with ID ${goalId} not found.`);
      }

      existingGoal.update(goalData);
      await this.goalRepository.update(goalId, existingGoal);

      return existingGoal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update goal: ${error.message}`);
      }
      throw error;
    }
  }
}