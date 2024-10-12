"use client";

import { useSession } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management
import { useRouter } from "next/navigation"; // For client-side routing
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand
import { NavItem } from "@/presentation/components/molecules/NavItem"; // For creating navigation items
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text
import { useState } from "react";

/**
 * @file packages/fitness-tracker/src/presentation/components/organisms/Sidebar.tsx
 * @description Implements the sidebar component for the application, displaying navigation items for different pages.
 * @author CosLynxAI
 */

interface SidebarProps {
  /** Additional CSS classes to apply to the sidebar element. */
  className?: string;
}

/**
 * @description Renders the sidebar component, displaying navigation links for various pages within the fitness tracker application.
 * @param {SidebarProps} props The component's properties.
 * @returns {JSX.Element} The rendered sidebar element.
 */
export default function Sidebar({ className }: SidebarProps) {
  const { data: session, status } = useSession(); // Get the user session data
  const router = useRouter(); // Create a router instance for client-side navigation
  const { goals, workouts } = useStore(); // Access the global state using Zustand

  // Handle the click event for the sidebar navigation items.
  //  - When a link is clicked:
  //    - Update the current route using the router instance.
  //    - Close the sidebar (if necessary).
  const handleClick = (href: string) => {
    router.push(href);
  };

  // Conditional rendering for the sidebar navigation items.
  //  - Display different navigation items based on the authentication status.
  //    - If authenticated, display:
  //      - Dashboard
  //      - Goals
  //      - Workouts
  //      - Profile
  //      - Settings
  //    - If not authenticated, display:
  //      - Login
  //      - Register
  return (
    <div className={`flex flex-col h-screen bg-gray-800 text-white shadow-md ${className || ""}`}>
      <div className="flex items-center justify-between p-4">
        {/* Display the application logo or name */}
        <Typography variant="h1" className="text-2xl font-bold">
          Fitness Tracker
        </Typography>
        {/* Optionally display a button to close the sidebar */}
        <button onClick={() => handleClick("/")} className="text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
          Close
        </button>
      </div>
      {/* Display navigation items within a list */}
      <ul className="flex flex-col mt-4">
        {status === "authenticated" ? (
          <>
            {/* Display navigation items for authenticated users */}
            <NavItem href="/dashboard" text="Dashboard" icon={null} onClick={() => handleClick("/dashboard")} />
            <NavItem href="/goals" text="Goals" icon={null} onClick={() => handleClick("/goals")} />
            <NavItem href="/workouts" text="Workouts" icon={null} onClick={() => handleClick("/workouts")} />
            <NavItem href="/profile" text="Profile" icon={null} onClick={() => handleClick("/profile")} />
            <NavItem href="/settings" text="Settings" icon={null} onClick={() => handleClick("/settings")} />
          </>
        ) : (
          <>
            {/* Display navigation items for unauthenticated users */}
            <NavItem href="/auth/login" text="Login" icon={null} onClick={() => handleClick("/auth/login")} />
            <NavItem href="/auth/register" text="Register" icon={null} onClick={() => handleClick("/auth/register")} />
          </>
        )}
      </ul>
    </div>
  );
}