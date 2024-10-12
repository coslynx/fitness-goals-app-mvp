import { WorkoutRepository } from '../../repositories/WorkoutRepository';
import { Workout } from '../../entities/Workout';

export class UpdateWorkout {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  async execute(workoutId: string, workoutData: Partial<Workout>): Promise<Workout> {
    try {
      const existingWorkout = await this.workoutRepository.findById(workoutId);

      if (!existingWorkout) {
        throw new Error(`Workout with ID ${workoutId} not found.`);
      }

      existingWorkout.update(workoutData);
      await this.workoutRepository.update(workoutId, existingWorkout);

      return existingWorkout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update workout: ${error.message}`);
      }
      throw error;
    }
  }
}