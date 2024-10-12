"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management
import { useRouter } from "next/navigation"; // For client-side routing
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text
import { Button } from "@/presentation/components/atoms/Button"; // For creating buttons
import { Input } from "@/presentation/components/atoms/Input"; // For creating input fields
import { FormField } from "@/presentation/components/molecules/FormField"; // For creating form fields
import { UserService } from "@/infrastructure/api/services/UserService"; // For user-related business logic
import { User } from "@/domain/users/entities/User"; // For user data model

/**
 * @file packages/fitness-tracker/src/presentation/pages/profile/page.tsx
 * @description Implements the user profile page, allowing users to view and update their account information.
 * @author CosLynxAI
 */
export default function ProfilePage() {
  const { data: session, status } = useSession(); // Get user session data using NextAuth.js
  const router = useRouter(); // Create a router instance for client-side navigation
  const { goals, workouts } = useStore(); // Access global state using Zustand
  const [userData, setUserData] = useState<Partial<User>>({}); // Initialize local state for user data
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State for error message

  useEffect(() => {
    // Fetch user data on initial page load
    fetchUserData();
  }, []);

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    if (session?.user.id) {
      setIsLoading(true);
      try {
        const userService = new UserService();
        const user = await userService.findById(session.user.id);
        setUserData(user);
        setIsLoading(false);
      } catch (error) {
        // Handle potential errors during data fetching
        if (error instanceof Error) {
          setError(error.message);
          setIsLoading(false);
        } else {
          setError("An unexpected error occurred.");
          setIsLoading(false);
        }
      }
    }
  };

  // Function to handle form submission for updating user data
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const userService = new UserService();
      const updatedUser = await userService.update(session.user.id, userData);
      setUserData(updatedUser); // Update local state with the updated user data
      setIsLoading(false);
      // Optionally display a success message
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setIsLoading(false);
      } else {
        setError("An unexpected error occurred.");
        setIsLoading(false);
      }
    }
  };

  // Conditional rendering based on authentication status and loading state
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Typography variant="h1" className="text-4xl font-bold text-gray-800 mb-4">
          Loading...
        </Typography>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Typography variant="h1" className="text-4xl font-bold text-gray-800 mb-4">
          Please log in to view your profile
        </Typography>
      </div>
    );
  }

  // Main profile page content
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Typography variant="h1" className="text-4xl font-bold text-gray-800 mb-4">
        Your Profile
      </Typography>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        {/* Email input field */}
        <FormField label="Email">
          <Input
            type="email"
            value={userData.email || ""} // Use initial email if available, otherwise ""
            onChange={(e) =>
              setUserData((prevData) => ({ ...prevData, email: e.target.value }))
            }
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </FormField>

        {/* Password input field */}
        <FormField label="Password">
          <Input
            type="password"
            value={userData.password || ""}
            onChange={(e) =>
              setUserData((prevData) => ({ ...prevData, password: e.target.value }))
            }
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </FormField>

        {/* Error message display */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Update button */}
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Update Profile
        </Button>
      </form>

      {/* Loading indicator */}
      {isLoading && (
        <div className="mt-4">
          <Typography variant="p" className="text-gray-500">
            Updating...
          </Typography>
        </div>
      )}
    </div>
  );
}