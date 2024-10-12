import { Goal } from '../../entities/Goal';
import { GoalRepository } from '../../repositories/GoalRepository';

export class CreateGoal {
  constructor(private readonly goalRepository: GoalRepository) {}

  async execute(goalData: Goal): Promise<Goal> {
    try {
      const newGoal = await this.goalRepository.create(goalData);
      return newGoal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create goal: ${error.message}`);
      }
      throw error;
    }
  }
}