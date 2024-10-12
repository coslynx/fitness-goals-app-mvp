"use client";

import { useSession, signOut } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management.
import { Session } from "next-auth"; // Type definition for NextAuth.js session object.
import { useState } from "react"; // For managing component state.

/**
 * @file packages/fitness-tracker/src/presentation/hooks/useAuth.ts
 * @description Custom hook for managing authentication state and providing user session data.
 * @author CosLynxAI
 */

/**
 * @description Custom hook that manages authentication state and provides user session data.
 * @returns {object} An object containing the user session data, a boolean indicating authentication status, and functions for handling authentication actions.
 */
export default function useAuth() {
  const { data: session, status } = useSession(); // Get the user session data using NextAuth.js.
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator.
  const [error, setError] = useState(null); // State for error message.

  /**
   * @description Function to handle user logout.
   * @returns {Promise<void>} Resolves after logout is complete.
   */
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await session?.user?.id && session?.user?.email ? signOut() : Promise.resolve();
      setIsLoading(false);
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

  return {
    session, // User session data (if authenticated).
    isLoading, // Whether the authentication process is in progress.
    error, // Any errors encountered during authentication.
    handleLogout, // Function to log out the current user.
  };
}