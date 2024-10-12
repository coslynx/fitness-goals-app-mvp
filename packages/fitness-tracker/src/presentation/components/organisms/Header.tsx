"use client";

import { useSession, signOut } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management
import { useRouter } from "next/navigation"; // For client-side routing
import { NavItem } from "@/presentation/components/molecules/NavItem"; // For creating navigation items
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text
import { Button } from "@/presentation/components/atoms/Button"; // For creating buttons
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand

/**
 * @file packages/fitness-tracker/src/presentation/components/organisms/Header.tsx
 * @description Implements the header component for the fitness tracker application.
 * @author CosLynxAI
 */

interface HeaderProps {
  /** Additional CSS classes to apply to the header element. */
  className?: string;
}

/**
 * @description Renders the header component, providing navigation links and user-specific actions.
 * @param {HeaderProps} props The component's properties.
 * @returns {JSX.Element} The rendered header element.
 */
export default function Header({ className }: HeaderProps) {
  const { data: session, status } = useSession(); // Get the user session data
  const router = useRouter(); // Create a router instance for client-side navigation
  const { goals, workouts } = useStore(); // Access the global state using Zustand

  // Handle the click event for navigation items
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
    <header className={`bg-white shadow-md py-4 ${className || ""}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Display the application logo or name */}
        <Typography variant="h1" className="text-2xl font-bold text-gray-800">
          Fitness Tracker
        </Typography>

        {/* Navigation and user actions */}
        <ul className="flex">
          {status === "authenticated" ? (
            <>
              {/* Navigation items for authenticated users */}
              <NavItem href="/dashboard" text="Dashboard" icon={null} onClick={() => handleClick("/dashboard")} />
              <NavItem href="/goals" text="Goals" icon={null} onClick={() => handleClick("/goals")} />
              <NavItem href="/workouts" text="Workouts" icon={null} onClick={() => handleClick("/workouts")} />
              <NavItem href="/profile" text="Profile" icon={null} onClick={() => handleClick("/profile")} />
              <NavItem href="/settings" text="Settings" icon={null} onClick={() => handleClick("/settings")} />
              {/* Logout button */}
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
              {/* Navigation items for unauthenticated users */}
              <NavItem href="/auth/login" text="Login" icon={null} onClick={() => handleClick("/auth/login")} />
              <NavItem href="/auth/register" text="Register" icon={null} onClick={() => handleClick("/auth/register")} />
            </>
          )}
        </ul>
      </div>
    </header>
  );
}