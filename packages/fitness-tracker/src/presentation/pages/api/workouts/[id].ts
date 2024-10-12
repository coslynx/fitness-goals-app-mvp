"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // v4.24.8
import { WorkoutService } from "../../../../infrastructure/api/services/WorkoutService"; // Import the WorkoutService for handling workout-related business logic.

/**
 * @file packages/fitness-tracker/src/presentation/pages/api/workouts/[id].ts
 * @description Handles API requests related to individual workouts, including retrieving, updating, and deleting specific workouts.
 * @author CosLynxAI
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const workoutService = new WorkoutService();
    const workoutId = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const workout = await workoutService.findById(workoutId);
        if (workout) {
          return res.status(200).json(workout);
        } else {
          return res.status(404).json({ error: `Workout with ID ${workoutId} not found.` });
        }
      }
      case "PUT": {
        const workoutData = req.body;
        const updatedWorkout = await workoutService.update(workoutId, workoutData);
        if (updatedWorkout) {
          return res.status(200).json(updatedWorkout);
        } else {
          return res.status(404).json({ error: `Workout with ID ${workoutId} not found.` });
        }
      }
      case "DELETE": {
        await workoutService.delete(workoutId);
        return res.status(204).send();
      }
      default: {
        return res.status(405).json({ error: "Method not allowed" });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}