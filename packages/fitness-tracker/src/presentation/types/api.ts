/**
 * @file packages/fitness-tracker/src/presentation/types/api.ts
 * @description Defines types for API data, ensuring type safety and consistency in API interactions.
 * @author CosLynxAI
 */

import { Goal } from "@/domain/goals/entities/Goal"; // Import the Goal entity interface
import { Workout } from "@/domain/workouts/entities/Workout"; // Import the Workout entity interface
import { User } from "@/domain/users/entities/User"; // Import the User entity interface

/**
 * @description The response type for a successful API request.
 * @template T The type of the data in the response.
 */
export interface ApiSuccessResponse<T> {
  status: "success";
  data: T;
}

/**
 * @description The response type for an API request that encountered an error.
 */
export interface ApiErrorResponse {
  status: "error";
  message: string;
}

/**
 * @description The combined response type for API requests, encompassing both successful and error responses.
 * @template T The type of the data in the successful response.
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * @description The type for a registered user, including their ID, email, and potentially other data.
 */
export type RegisteredUser = {
  id: string;
  email: string;
};

/**
 * @description The type for a generated JWT token.
 */
export type JwtToken = string;

/**
 * @description The type for a user session, containing user information and a JWT token.
 */
export type UserSession = {
  user: RegisteredUser;
  token: JwtToken;
};

/**
 * @description The type for a user authentication response, which can be either a successful login or an error response.
 */
export type AuthResponse = ApiResponse<UserSession>;

/**
 * @description The type for a user registration response, which can be either a successful registration or an error response.
 */
export type RegisterResponse = ApiResponse<RegisteredUser>;

/**
 * @description The type for a goal creation response, which can be either a successful goal creation or an error response.
 */
export type CreateGoalResponse = ApiResponse<Goal>;

/**
 * @description The type for a goal retrieval response, which can be either a successful goal retrieval or an error response.
 */
export type GetGoalResponse = ApiResponse<Goal | null>;

/**
 * @description The type for a goal update response, which can be either a successful goal update or an error response.
 */
export type UpdateGoalResponse = ApiResponse<Goal>;

/**
 * @description The type for a goal deletion response, which can be either a successful goal deletion or an error response.
 */
export type DeleteGoalResponse = ApiResponse<void>;

/**
 * @description The type for a workout creation response, which can be either a successful workout creation or an error response.
 */
export type CreateWorkoutResponse = ApiResponse<Workout>;

/**
 * @description The type for a workout retrieval response, which can be either a successful workout retrieval or an error response.
 */
export type GetWorkoutResponse = ApiResponse<Workout | null>;

/**
 * @description The type for a workout update response, which can be either a successful workout update or an error response.
 */
export type UpdateWorkoutResponse = ApiResponse<Workout>;

/**
 * @description The type for a workout deletion response, which can be either a successful workout deletion or an error response.
 */
export type DeleteWorkoutResponse = ApiResponse<void>;

/**
 * @description The type for a user retrieval response, which can be either a successful user retrieval or an error response.
 */
export type GetUserResponse = ApiResponse<User | null>;

/**
 * @description The type for a user update response, which can be either a successful user update or an error response.
 */
export type UpdateUserResponse = ApiResponse<User>;

/**
 * @description The type for a user deletion response, which can be either a successful user deletion or an error response.
 */
export type DeleteUserResponse = ApiResponse<void>;