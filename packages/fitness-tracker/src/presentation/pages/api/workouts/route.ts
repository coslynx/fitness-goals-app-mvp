"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // v4.24.8
import { WorkoutService } from "../../../../infrastructure/api/services/WorkoutService"; // Import the WorkoutService for handling workout-related business logic.

/**
 * @file packages/fitness-tracker/src/presentation/pages/api/workouts/route.ts
 * @description Handles API requests related to workouts, including creating, updating, and deleting workouts.
 * @author CosLynxAI
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req }); // Ensure user is authenticated using NextAuth.js.
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const workoutService = new WorkoutService(); // Initialize the WorkoutService instance.

    switch (req.method) {
      case "POST": {
        // Create a new workout.
        // 1. Validate the request body to ensure it conforms to the Workout data structure.
        // 2. Add the user ID from the session to the request body.
        // 3. Use the workoutService.create() method to create the workout.
        // 4. Return a 201 status code with the newly created workout data.
        // Example:
        const workoutData = req.body;
        const createdWorkout = await workoutService.create({
          ...workoutData,
          userId: session.user.id,
        });
        return res.status(201).json(createdWorkout);
      }
      case "GET": {
        // Get all workouts for the current user.
        // 1. Get the user ID from the session.
        // 2. Use the workoutService.findAllByUserId() method to fetch all workouts for the user.
        // 3. Return a 200 status code with the array of workout data.
        const workouts = await workoutService.findAllByUserId(session.user.id);
        return res.status(200).json(workouts);
      }
      case "PUT": {
        // Update a specific workout by ID.
        // 1. Get the workout ID from the request parameters (req.query.id).
        // 2. Validate the request body to ensure it conforms to the Workout data structure.
        // 3. Use the workoutService.update() method to update the workout.
        // 4. Return a 200 status code with the updated workout data.
        const workoutId = req.query.id as string;
        const workoutData = req.body;
        const updatedWorkout = await workoutService.update(workoutId, workoutData);
        return res.status(200).json(updatedWorkout);
      }
      case "DELETE": {
        // Delete a specific workout by ID.
        // 1. Get the workout ID from the request parameters (req.query.id).
        // 2. Use the workoutService.delete() method to delete the workout.
        // 3. Return a 204 status code (no content).
        const workoutId = req.query.id as string;
        await workoutService.delete(workoutId);
        return res.status(204).send();
      }
      default: {
        // Handle unsupported HTTP methods.
        return res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    // Handle potential errors.
    // 1. Log the error using Sentry.
    // 2. Return a 500 status code with an appropriate error message.
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}