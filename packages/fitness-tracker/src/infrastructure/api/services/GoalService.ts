import { Goal } from '../../../domain/goals/entities/Goal';
import { GoalRepository } from '../../../domain/goals/repositories/GoalRepository';
import { CreateGoal } from '../../../domain/goals/usecases/CreateGoal';
import { UpdateGoal } from '../../../domain/goals/usecases/UpdateGoal';
import { DeleteGoal } from '../../../domain/goals/usecases/DeleteGoal';

/**
 * @file packages/fitness-tracker/src/infrastructure/api/services/GoalService.ts
 * @description Service for managing goal data.
 * @author CosLynxAI
 */
export class GoalService {
  private readonly goalRepository: GoalRepository;

  constructor() {
    this.goalRepository = new GoalRepository();
  }

  /**
   * @description Creates a new goal record.
   * @param {Goal} goalData The goal data to create.
   * @returns {Promise<Goal>} The newly created goal.
   */
  async create(goalData: Goal): Promise<Goal> {
    try {
      const createGoal = new CreateGoal(this.goalRepository);
      const createdGoal = await createGoal.execute(goalData);
      return createdGoal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create goal: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Finds a goal by ID.
   * @param {string} goalId The goal ID to search for.
   * @returns {Promise<Goal | null>} The goal with the specified ID, or null if no goal is found.
   */
  async findById(goalId: string): Promise<Goal | null> {
    try {
      const goal = await this.goalRepository.findById(goalId);
      return goal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find goal: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Finds all goals for the current user.
   * @returns {Promise<Goal[]>} An array of all goals for the current user.
   */
  async findAll(): Promise<Goal[]> {
    try {
      const userId = 'YOUR_USER_ID'; // Retrieve user ID from the request context or session
      const goals = await this.goalRepository.findAllByUserId(userId);
      return goals;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to find goals: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Updates a goal record.
   * @param {string} goalId The goal ID to update.
   * @param {Partial<Goal>} goalData The updated goal data.
   * @returns {Promise<Goal>} The updated goal.
   */
  async update(goalId: string, goalData: Partial<Goal>): Promise<Goal> {
    try {
      const updateGoal = new UpdateGoal(this.goalRepository);
      const updatedGoal = await updateGoal.execute(goalId, goalData);
      return updatedGoal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update goal: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Deletes a goal record.
   * @param {string} goalId The goal ID to delete.
   * @returns {Promise<void>}
   */
  async delete(goalId: string): Promise<void> {
    try {
      const deleteGoal = new DeleteGoal(this.goalRepository);
      await deleteGoal.execute(goalId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete goal: ${error.message}`);
      }
      throw error;
    }
  }
}