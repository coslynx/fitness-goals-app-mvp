import { Workout } from '../../entities/Workout';
import { WorkoutRepository } from '../../repositories/WorkoutRepository';

export class CreateWorkout {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  async execute(workoutData: Workout): Promise<Workout> {
    try {
      const newWorkout = await this.workoutRepository.create(workoutData);
      return newWorkout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create workout: ${error.message}`);
      }
      throw error;
    }
  }
}