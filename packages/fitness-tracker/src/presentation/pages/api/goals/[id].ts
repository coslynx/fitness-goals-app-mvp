"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // v4.24.8
import { GoalService } from "../../../../infrastructure/api/services/GoalService";

/**
 * @file packages/fitness-tracker/src/presentation/pages/api/goals/[id].ts
 * @description Handles API requests related to individual goals, including retrieving, updating, and deleting specific goals.
 * @author CosLynxAI
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const goalService = new GoalService();
    const goalId = req.query.id as string;

    switch (req.method) {
      case "GET": {
        const goal = await goalService.findById(goalId);
        if (goal) {
          return res.status(200).json(goal);
        } else {
          return res.status(404).json({ error: `Goal with ID ${goalId} not found.` });
        }
      }
      case "PUT": {
        const goalData = req.body;
        const updatedGoal = await goalService.update(goalId, goalData);
        if (updatedGoal) {
          return res.status(200).json(updatedGoal);
        } else {
          return res.status(404).json({ error: `Goal with ID ${goalId} not found.` });
        }
      }
      case "DELETE": {
        await goalService.delete(goalId);
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