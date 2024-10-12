/**
 * @file packages/fitness-tracker/src/presentation/utils/formatters.ts
 * @description Utility functions for formatting data in the fitness tracker application.
 * @author CosLynxAI
 */

import { Goal } from "@/domain/goals/entities/Goal";
import { Workout } from "@/domain/workouts/entities/Workout";
import { User } from "@/domain/users/entities/User";

/**
 * @description Formats a date into a human-readable string.
 * @param {Date} date The date to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (date: Date): string => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

/**
 * @description Formats a duration in minutes into a human-readable string.
 * @param {number} duration The duration in minutes.
 * @returns {string} The formatted duration string.
 */
export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

/**
 * @description Formats a goal object for display in the UI.
 * @param {Goal} goal The goal object to format.
 * @returns {object} The formatted goal object.
 */
export const formatGoal = (goal: Goal): { title: string; description: string; target: string; deadline: string; progress: number } => {
  const progress = Math.round((Date.now() - new Date(goal.deadline).getTime()) / (1000 * 60 * 60 * 24));
  return {
    title: goal.title,
    description: goal.description,
    target: `${goal.target}`,
    deadline: formatDate(goal.deadline),
    progress,
  };
};

/**
 * @description Formats a workout object for display in the UI.
 * @param {Workout} workout The workout object to format.
 * @returns {object} The formatted workout object.
 */
export const formatWorkout = (workout: Workout): { type: string; duration: string; intensity: string; caloriesBurned: string; date: string } => {
  return {
    type: workout.type,
    duration: formatDuration(workout.duration),
    intensity: workout.intensity,
    caloriesBurned: `${workout.caloriesBurned}`,
    date: formatDate(workout.date),
  };
};

/**
 * @description Formats a user object for display in the UI.
 * @param {User} user The user object to format.
 * @returns {object} The formatted user object.
 */
export const formatUser = (user: User): { email: string; goals: { title: string; description: string; target: string; deadline: string; progress: number }[]; workouts: { type: string; duration: string; intensity: string; caloriesBurned: string; date: string }[] } => {
  return {
    email: user.email,
    goals: user.goals.map(formatGoal),
    workouts: user.workouts.map(formatWorkout),
  };
};