import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // v4.24.8
import { GoalService } from "../../../../infrastructure/api/services/GoalService"; // Import the GoalService for handling goal-related business logic.

/**
 * @file packages/fitness-tracker/src/presentation/pages/api/goals/route.ts
 * @description Handles API requests related to goals, including creating, updating, and deleting goals.
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

    const goalService = new GoalService(); // Initialize the GoalService instance.

    switch (req.method) {
      case "POST": {
        // Create a new goal.
        // 1. Validate the request body to ensure it conforms to the Goal data structure.
        // 2. Add the user ID from the session to the request body.
        // 3. Use the goalService.create() method to create the goal.
        // 4. Return a 201 status code with the newly created goal data.
        // Example:
        const goalData = req.body;
        const createdGoal = await goalService.create({ ...goalData, userId: session.user.id });
        return res.status(201).json(createdGoal);
      }
      case "GET": {
        // Get all goals for the current user.
        // 1. Get the user ID from the session.
        // 2. Use the goalService.findAllByUserId() method to fetch all goals for the user.
        // 3. Return a 200 status code with the array of goal data.
        const goals = await goalService.findAllByUserId(session.user.id);
        return res.status(200).json(goals);
      }
      case "PUT": {
        // Update a specific goal by ID.
        // 1. Get the goal ID from the request parameters (req.query.id).
        // 2. Validate the request body to ensure it conforms to the Goal data structure.
        // 3. Use the goalService.update() method to update the goal.
        // 4. Return a 200 status code with the updated goal data.
        const goalId = req.query.id as string;
        const goalData = req.body;
        const updatedGoal = await goalService.update(goalId, goalData);
        return res.status(200).json(updatedGoal);
      }
      case "DELETE": {
        // Delete a specific goal by ID.
        // 1. Get the goal ID from the request parameters (req.query.id).
        // 2. Use the goalService.delete() method to delete the goal.
        // 3. Return a 204 status code (no content).
        const goalId = req.query.id as string;
        await goalService.delete(goalId);
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