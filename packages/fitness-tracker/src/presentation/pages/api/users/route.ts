"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // v4.24.8
import { UserService } from "../../../../infrastructure/api/services/UserService"; // Import the UserService for handling user-related business logic.

/**
 * @file packages/fitness-tracker/src/presentation/pages/api/users/route.ts
 * @description Handles API requests related to users, including creating, updating, and deleting users.
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

    const userService = new UserService(); // Initialize the UserService instance.

    switch (req.method) {
      case "POST": {
        // Create a new user.
        // 1. Validate the request body to ensure it conforms to the User data structure.
        // 2. Use the userService.create() method to create the user.
        // 3. Return a 201 status code with the newly created user data.
        // Example:
        const userData = req.body;
        const createdUser = await userService.create(userData);
        return res.status(201).json(createdUser);
      }
      case "GET": {
        // Get all users.
        // 1. Use the userService.findAll() method to fetch all users.
        // 2. Return a 200 status code with the array of user data.
        const users = await userService.findAll();
        return res.status(200).json(users);
      }
      case "PUT": {
        // Update a specific user by ID.
        // 1. Get the user ID from the request parameters (req.query.id).
        // 2. Validate the request body to ensure it conforms to the User data structure.
        // 3. Use the userService.update() method to update the user.
        // 4. Return a 200 status code with the updated user data.
        const userId = req.query.id as string;
        const userData = req.body;
        const updatedUser = await userService.update(userId, userData);
        return res.status(200).json(updatedUser);
      }
      case "DELETE": {
        // Delete a specific user by ID.
        // 1. Get the user ID from the request parameters (req.query.id).
        // 2. Use the userService.delete() method to delete the user.
        // 3. Return a 204 status code (no content).
        const userId = req.query.id as string;
        await userService.delete(userId);
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