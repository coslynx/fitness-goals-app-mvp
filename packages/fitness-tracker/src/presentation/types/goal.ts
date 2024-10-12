/**
 * @file packages/fitness-tracker/src/presentation/types/goal.ts
 * @description Defines types for goal data, ensuring type safety and consistency in API interactions and UI components.
 * @author CosLynxAI
 */

import { Goal } from "@/domain/goals/entities/Goal"; // Import the Goal entity interface from the domain layer

/**
 * @description The type for a goal creation request, including all goal details.
 */
export type CreateGoalRequest = Omit<Goal, "id">;

/**
 * @description The type for a goal update request, including only the fields to be updated.
 */
export type UpdateGoalRequest = Partial<Goal>;

/**
 * @description The type for a goal response from the API, encompassing both successful and error responses.
 */
export type GoalResponse = ApiResponse<Goal>;

/**
 * @description The type for a goal retrieval response, which can be either a successful goal retrieval or an error response.
 */
export type GetGoalResponse = ApiResponse<Goal | null>;

/**
 * @description The type for a goal deletion response, which can be either a successful goal deletion or an error response.
 */
export type DeleteGoalResponse = ApiResponse<void>;