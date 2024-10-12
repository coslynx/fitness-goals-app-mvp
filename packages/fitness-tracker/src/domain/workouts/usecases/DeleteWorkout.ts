import { WorkoutRepository } from '../../repositories/WorkoutRepository';

export class DeleteWorkout {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  async execute(workoutId: string): Promise<void> {
    try {
      await this.workoutRepository.delete(workoutId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete workout: ${error.message}`);
      }
      throw error;
    }
  }
}