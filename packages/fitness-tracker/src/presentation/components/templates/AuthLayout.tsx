"use client";

import { useSession, signOut } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management
import { useRouter } from "next/navigation"; // For client-side routing
import { NavItem } from "@/presentation/components/molecules/NavItem"; // For creating navigation items
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text
import { Button } from "@/presentation/components/atoms/Button"; // For creating buttons
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand

/**
 * @file packages/fitness-tracker/src/presentation/components/templates/AuthLayout.tsx
 * @description Implements a layout component specifically for authentication-related pages like login and registration.
 * @author CosLynxAI
 */

interface AuthLayoutProps {
  /** The child content to be rendered within the layout. */
  children: React.ReactNode;
}

/**
 * @description Renders the authentication layout component, providing a consistent structure for login and registration pages.
 * @param {AuthLayoutProps} props The component's properties.
 * @returns {JSX.Element} The rendered authentication layout element.
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: session, status } = useSession(); // Get the user session data using NextAuth.js
  const router = useRouter(); // Create a router instance for client-side navigation
  const { goals, workouts } = useStore(); // Access the global state using the Zustand store

  // Function to handle the click event for navigation items
  //  - When a link is clicked:
  //    - Update the current route using the router instance.
  const handleClick = (href: string) => {
    router.push(href);
  };

  // Conditional rendering for navigation items and user actions
  //  - Display different content based on the authentication status.
  //    - If authenticated, display:
  //      - Dashboard
  //      - Goals
  //      - Workouts
  //      - Profile
  //      - Settings
  //      - Logout button
  //    - If not authenticated, display:
  //      - Login
  //      - Register
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto flex flex-col items-center justify-between">
        <Typography variant="h1" className="text-4xl font-bold text-gray-800 mb-4">
          Track Your Fitness Goals Easily Now
        </Typography>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
          {children}
        </div>
        <Typography variant="p" className="text-gray-500 text-center">
          {status === "authenticated" ? (
            <>
              <p>Welcome, {session?.user?.name}!</p>
              <Button
                type="button"
                onClick={() => {
                  // Handle logout functionality
                  //  - Use `signOut` from `next-auth/react`
                  signOut(); // This will automatically redirect to the login page
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <p>Please log in to continue.</p>
              <Button
                type="button"
                onClick={() => handleClick("/auth/login")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log In
              </Button>
              <Button
                type="button"
                onClick={() => handleClick("/auth/register")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
              >
                Sign Up
              </Button>
            </>
          )}
        </Typography>
      </div>
    </div>
  );
}