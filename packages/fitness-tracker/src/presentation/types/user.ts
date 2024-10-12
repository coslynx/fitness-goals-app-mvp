/**
 * @file packages/fitness-tracker/src/presentation/types/user.ts
 * @description Defines types for user data, ensuring type safety and consistency in API interactions and UI components.
 * @author CosLynxAI
 */

import { User } from "@/domain/users/entities/User"; // Import the User entity interface from the domain layer

/**
 * @description The type for a user creation request, including all user details.
 */
export type CreateUserRequest = Omit<User, "id" | "goals" | "workouts">;

/**
 * @description The type for a user update request, including only the fields to be updated.
 */
export type UpdateUserRequest = Partial<User>;

/**
 * @description The type for a user response from the API, encompassing both successful and error responses.
 */
export type UserResponse = ApiResponse<User>;

/**
 * @description The type for a user retrieval response, which can be either a successful user retrieval or an error response.
 */
export type GetuserResponse = ApiResponse<User | null>;

/**
 * @description The type for a user deletion response, which can be either a successful user deletion or an error response.
 */
export type DeleteuserResponse = ApiResponse<void>;