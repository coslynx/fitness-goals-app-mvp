import { Workout } from '../../../domain/workouts/entities/Workout';
import { WorkoutRepository } from '../../../domain/workouts/repositories/WorkoutRepository';
import { CreateWorkout } from '../../../domain/workouts/usecases/CreateWorkout';
import { UpdateWorkout } from '../../../domain/workouts/usecases/UpdateWorkout';
import { DeleteWorkout } from '../../../domain/workouts/usecases/DeleteWorkout';

/**
 * @file packages/fitness-tracker/src/infrastructure/api/services/WorkoutService.ts
 * @description Service for managing workout data.
 * @author CosLynxAI
 */
export class WorkoutService {
  private readonly workoutRepository: WorkoutRepository;

  constructor() {
    this.workoutRepository = new WorkoutRepository();
  }

  /**
   * @description Creates a new workout record.
   * @param {Workout} workoutData The workout data to create.
   * @returns {Promise<Workout>} The newly created workout.
   */
  async create(workoutData: Workout): Promise<Workout> {
    try {
      const createWorkout = new CreateWorkout(this.workoutRepository);
      const createdWorkout = await createWorkout.execute(workoutData);
      return createdWorkout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create workout: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Finds a workout by ID.
   * @param {string} workoutId The workout ID to search for.
   * @returns {Promise<Workout | null>} The workout with the specified ID, or null if no workout is found.
   */
  async findById(workoutId: string): Promise<Workout | null> {
    try {
      const workout = await this.workoutRepository.findById(workoutId);
      return workout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find workout: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Finds all workouts for the current user.
   * @returns {Promise<Workout[]>} An array of all workouts for the current user.
   */
  async findAll(): Promise<Workout[]> {
    try {
      const userId = 'YOUR_USER_ID'; // Retrieve user ID from the request context or session
      const workouts = await this.workoutRepository.findAllByUserId(userId);
      return workouts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find workouts: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Updates a workout record.
   * @param {string} workoutId The workout ID to update.
   * @param {Partial<Workout>} workoutData The updated workout data.
   * @returns {Promise<Workout>} The updated workout.
   */
  async update(workoutId: string, workoutData: Partial<Workout>): Promise<Workout> {
    try {
      const updateWorkout = new UpdateWorkout(this.workoutRepository);
      const updatedWorkout = await updateWorkout.execute(workoutId, workoutData);
      return updatedWorkout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update workout: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Deletes a workout record.
   * @param {string} workoutId The workout ID to delete.
   * @returns {Promise<void>}
   */
  async delete(workoutId: string): Promise<void> {
    try {
      const deleteWorkout = new DeleteWorkout(this.workoutRepository);
      await deleteWorkout.execute(workoutId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete workout: ${error.message}`);
      }
      throw error;
    }
  }
}