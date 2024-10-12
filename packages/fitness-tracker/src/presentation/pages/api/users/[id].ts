"use client";

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"; // v4.24.8
import { UserService } from "../../../../infrastructure/api/services/UserService"; // Import the UserService for handling user-related business logic.

/**
 * @file packages/fitness-tracker/src/presentation/pages/api/users/[id].ts
 * @description Handles API requests related to individual users, including retrieving, updating, and deleting specific users.
 * @author CosLynxAI
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req }); // Ensure user is authenticated using NextAuth.js.
    if (!session) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userService = new UserService(); // Initialize the UserService instance.
    const userId = req.query.id as string; // Extract the user ID from the request query.

    switch (req.method) {
      case "GET": {
        // Retrieve a user by their ID
        // 1. Validate the user ID to ensure it's a valid format (e.g., UUID, email).
        // 2. Call the userService.findById() method to fetch the user data from the database.
        // 3. If the user is found, return a 200 status code with the user data.
        // 4. If the user is not found, return a 404 status code with an appropriate error message.
        const user = await userService.findById(userId);
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: `User with ID ${userId} not found.` });
        }
      }
      case "PUT": {
        // Update a specific user by ID
        // 1. Validate the user ID to ensure it's a valid format (e.g., UUID, email).
        // 2. Validate the request body to ensure it conforms to the User data structure. 
        // 3. Ensure the user is authorized to update this user (e.g., only allow updating their own profile).
        // 4. Call the userService.update() method to update the user in the database.
        // 5. If the user is updated successfully, return a 200 status code with the updated user data.
        // 6. If the user is not found, return a 404 status code with an appropriate error message.
        const userData = req.body;
        const updatedUser = await userService.update(userId, userData);
        if (updatedUser) {
          return res.status(200).json(updatedUser);
        } else {
          return res.status(404).json({ error: `User with ID ${userId} not found.` });
        }
      }
      case "DELETE": {
        // Delete a specific user by ID
        // 1. Validate the user ID to ensure it's a valid format (e.g., UUID, email).
        // 2. Ensure the user is authorized to delete this user (e.g., only allow deleting their own account).
        // 3. Call the userService.delete() method to delete the user from the database.
        // 4. Return a 204 status code (no content) to indicate successful deletion.
        // 5. If the user is not found, return a 404 status code with an appropriate error message.
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