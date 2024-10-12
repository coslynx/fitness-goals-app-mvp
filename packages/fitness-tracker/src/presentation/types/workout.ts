/**
 * @file packages/fitness-tracker/src/presentation/types/workout.ts
 * @description Defines types for workout data, ensuring type safety and consistency in API interactions and UI components.
 * @author CosLynxAI
 */

import { Workout } from "@/domain/workouts/entities/Workout"; // Import the Workout entity interface from the domain layer

/**
 * @description The type for a workout creation request, including all workout details.
 */
export type CreateWorkoutRequest = Omit<Workout, "id">;

/**
 * @description The type for a workout update request, including only the fields to be updated.
 */
export type UpdateWorkoutRequest = Partial<Workout>;

/**
 * @description The type for a workout response from the API, encompassing both successful and error responses.
 */
export type WorkoutResponse = ApiResponse<Workout>;

/**
 * @description The type for a workout retrieval response, which can be either a successful workout retrieval or an error response.
 */
export type GetWorkoutResponse = ApiResponse<Workout | null>;

/**
 * @description The type for a workout deletion response, which can be either a successful workout deletion or an error response.
 */
export type DeleteWorkoutResponse = ApiResponse<void>;