"use client";

import axios, { AxiosResponse } from "axios"; // v1.7.7 - For making API requests
import { useSession } from "next-auth/react"; // v4.24.8 - For accessing user session data
import { Goal } from "@/domain/goals/entities/Goal"; // Import the Goal entity from the domain layer
import { Workout } from "@/domain/workouts/entities/Workout"; // Import the Workout entity from the domain layer
import { GoalService } from "@/infrastructure/api/services/GoalService"; // Import the GoalService for handling goal-related API interactions
import { WorkoutService } from "@/infrastructure/api/services/WorkoutService"; // Import the WorkoutService for handling workout-related API interactions
import { useStore } from "@/presentation/hooks/useStore"; // Import the Zustand store for accessing global state

/**
 * @file packages/fitness-tracker/src/presentation/services/api.ts
 * @description Provides a service for interacting with the API.
 * @author CosLynxAI
 */

/**
 * @description Service for managing API interactions.
 */
export class ApiService {
  private readonly goalService: GoalService;
  private readonly workoutService: WorkoutService;

  constructor() {
    this.goalService = new GoalService();
    this.workoutService = new WorkoutService();
  }

  /**
   * @description Fetches all goals for the current user.
   * @returns {Promise<Goal[]>} A promise that resolves with an array of goals or rejects with an error.
   */
  async fetchAllGoals(): Promise<Goal[]> {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    try {
      const goals = await this.goalService.findAllByUserId(userId);
      return goals;
    } catch (error) {
      // Handle potential errors (e.g., network errors, database errors)
      if (error instanceof Error) {
        throw new Error(`Failed to fetch goals: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Fetches a specific goal by its ID.
   * @param {string} goalId The ID of the goal to fetch.
   * @returns {Promise<Goal | null>} A promise that resolves with the goal or null if no goal is found, or rejects with an error.
   */
  async fetchGoalById(goalId: string): Promise<Goal | null> {
    try {
      const goal = await this.goalService.findById(goalId);
      return goal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch goal with ID ${goalId}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Creates a new goal.
   * @param {Goal} goalData The data for the new goal.
   * @returns {Promise<Goal>} A promise that resolves with the newly created goal or rejects with an error.
   */
  async createGoal(goalData: Goal): Promise<Goal> {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    try {
      const createdGoal = await this.goalService.create({ ...goalData, userId });
      return createdGoal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create goal: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Updates an existing goal.
   * @param {string} goalId The ID of the goal to update.
   * @param {Partial<Goal>} goalData The updated goal data.
   * @returns {Promise<Goal>} A promise that resolves with the updated goal or rejects with an error.
   */
  async updateGoal(goalId: string, goalData: Partial<Goal>): Promise<Goal> {
    try {
      const updatedGoal = await this.goalService.update(goalId, goalData);
      return updatedGoal;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update goal with ID ${goalId}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Deletes a goal.
   * @param {string} goalId The ID of the goal to delete.
   * @returns {Promise<void>} A promise that resolves when the goal is deleted or rejects with an error.
   */
  async deleteGoal(goalId: string): Promise<void> {
    try {
      await this.goalService.delete(goalId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete goal with ID ${goalId}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Fetches all workouts for the current user.
   * @returns {Promise<Workout[]>} A promise that resolves with an array of workouts or rejects with an error.
   */
  async fetchAllWorkouts(): Promise<Workout[]> {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    try {
      const workouts = await this.workoutService.findAllByUserId(userId);
      return workouts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch workouts: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Fetches a specific workout by its ID.
   * @param {string} workoutId The ID of the workout to fetch.
   * @returns {Promise<Workout | null>} A promise that resolves with the workout or null if no workout is found, or rejects with an error.
   */
  async fetchWorkoutById(workoutId: string): Promise<Workout | null> {
    try {
      const workout = await this.workoutService.findById(workoutId);
      return workout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch workout with ID ${workoutId}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Creates a new workout.
   * @param {Workout} workoutData The data for the new workout.
   * @returns {Promise<Workout>} A promise that resolves with the newly created workout or rejects with an error.
   */
  async createWorkout(workoutData: Workout): Promise<Workout> {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    if (!userId) {
      throw new Error("User is not authenticated.");
    }
    try {
      const createdWorkout = await this.workoutService.create({ ...workoutData, userId });
      return createdWorkout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create workout: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Updates an existing workout.
   * @param {string} workoutId The ID of the workout to update.
   * @param {Partial<Workout>} workoutData The updated workout data.
   * @returns {Promise<Workout>} A promise that resolves with the updated workout or rejects with an error.
   */
  async updateWorkout(workoutId: string, workoutData: Partial<Workout>): Promise<Workout> {
    try {
      const updatedWorkout = await this.workoutService.update(workoutId, workoutData);
      return updatedWorkout;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to update workout with ID ${workoutId}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Deletes a workout.
   * @param {string} workoutId The ID of the workout to delete.
   * @returns {Promise<void>} A promise that resolves when the workout is deleted or rejects with an error.
   */
  async deleteWorkout(workoutId: string): Promise<void> {
    try {
      await this.workoutService.delete(workoutId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to delete workout with ID ${workoutId}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * @description Makes a generic API request.
   * @param {string} url The URL of the API endpoint.
   * @param {string} method The HTTP method (GET, POST, PUT, DELETE).
   * @param {any} data The request data.
   * @returns {Promise<AxiosResponse<any>>} A promise that resolves with the API response or rejects with an error.
   */
  async makeApiRequest(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    data?: any
  ): Promise<AxiosResponse<any>> {
    const { data: session } = useSession();
    const token = session?.user?.id ? await this.generateToken(session.user) : null;
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data,
    };
    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific axios error scenarios (e.g., network errors, request timeout)
        if (error.response) {
          // Client Error (4xx)
          throw new Error(`API Error: ${error.response.status}`);
        } else if (error.request) {
          // Server Error (5xx)
          throw new Error(`API Error: Server not responding`);
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`API Error: ${error.message}`);
        }
      } else {
        // Handle any other potential errors (e.g., validation errors, internal errors)
        throw new Error(error.message);
      }
    }
  }

  /**
   * @description Generates a JWT token for the given user.
   * @param {User} user The user for whom to generate the token.
   * @returns {Promise<string>} The JWT token.
   */
  async generateToken(user: User): Promise<string> {
    try {
      const authService = new AuthService();
      const token = await authService.generateToken(user);
      return token;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate token: ${error.message}`);
      }
      throw error;
    }
  }
}