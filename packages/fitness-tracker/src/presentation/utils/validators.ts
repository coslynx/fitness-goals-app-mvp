import { Goal } from "@/domain/goals/entities/Goal";
import { Workout } from "@/domain/workouts/entities/Workout";
import { User } from "@/domain/users/entities/User";

/**
 * @file packages/fitness-tracker/src/presentation/utils/validators.ts
 * @description Utility functions for validating data in the fitness tracker application.
 * @author CosLynxAI
 */

/**
 * @description Validates a goal object, ensuring it conforms to the required data structure.
 * @param {Goal} goal The goal object to validate.
 * @returns {boolean} True if the goal is valid, false otherwise.
 */
export const validateGoal = (goal: Goal): boolean => {
  // Validation rules for goal properties (ensure they are non-empty, of the correct type, etc.)
  // Example:
  if (!goal.title || goal.title.trim() === "") {
    return false;
  }
  if (!goal.description || goal.description.trim() === "") {
    return false;
  }
  if (isNaN(goal.target) || goal.target <= 0) {
    return false;
  }
  if (!goal.deadline || !(goal.deadline instanceof Date)) {
    return false;
  }
  if (!goal.userId || goal.userId.trim() === "") {
    return false;
  }

  // Additional validation logic as needed
  // ...

  return true; // Goal is valid
};

/**
 * @description Validates a workout object, ensuring it conforms to the required data structure.
 * @param {Workout} workout The workout object to validate.
 * @returns {boolean} True if the workout is valid, false otherwise.
 */
export const validateWorkout = (workout: Workout): boolean => {
  // Validation rules for workout properties (ensure they are non-empty, of the correct type, etc.)
  // Example:
  if (!workout.type || workout.type.trim() === "") {
    return false;
  }
  if (isNaN(workout.duration) || workout.duration <= 0) {
    return false;
  }
  if (!workout.intensity || workout.intensity.trim() === "") {
    return false;
  }
  if (isNaN(workout.caloriesBurned) || workout.caloriesBurned <= 0) {
    return false;
  }
  if (!workout.date || !(workout.date instanceof Date)) {
    return false;
  }
  if (!workout.userId || workout.userId.trim() === "") {
    return false;
  }

  // Additional validation logic as needed
  // ...

  return true; // Workout is valid
};

/**
 * @description Validates a user object, ensuring it conforms to the required data structure.
 * @param {User} user The user object to validate.
 * @returns {boolean} True if the user is valid, false otherwise.
 */
export const validateUser = (user: User): boolean => {
  // Validation rules for user properties (ensure they are non-empty, of the correct type, etc.)
  // Example:
  if (!user.email || user.email.trim() === "") {
    return false;
  }
  if (!user.password || user.password.trim() === "") {
    return false;
  }

  // Additional validation logic as needed
  // ...

  return true; // User is valid
};