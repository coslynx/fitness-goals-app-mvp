"use client";

import { useSession } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management.
import { useRouter } from "next/navigation"; // For client-side routing.
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand.
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text.
import { Button } from "@/presentation/components/atoms/Button"; // For creating buttons.
import { NavItem } from "@/presentation/components/molecules/NavItem"; // For creating navigation items.
import { GoalCard } from "@/presentation/components/molecules/GoalCard"; // For displaying individual goals.
import { WorkoutCard } from "@/presentation/components/molecules/WorkoutCard"; // For displaying individual workouts.
import { GoalService } from "@/infrastructure/api/services/GoalService"; // For goal-related business logic.
import { WorkoutService } from "@/infrastructure/api/services/WorkoutService"; // For workout-related business logic.
import { useState, useEffect } from "react"; // For managing state and side effects.

/**
 * @file packages/fitness-tracker/src/presentation/components/templates/DashboardLayout.tsx
 * @description Implements the dashboard layout template, providing a consistent structure for the user dashboard page.
 * @author CosLynxAI
 */

interface DashboardLayoutProps {
  /** The child content to be rendered within the layout. */
  children: React.ReactNode;
}

/**
 * @description Renders the dashboard layout, including header, sidebar, footer, and content area.
 * @param {DashboardLayoutProps} props The component's properties.
 * @returns {JSX.Element} The rendered dashboard layout element.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session, status } = useSession(); // Get the user session data using NextAuth.js.
  const router = useRouter(); // Create a router instance for client-side navigation.
  const { goals, workouts } = useStore(); // Access the global state using the Zustand store.
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator.
  const [error, setError] = useState(null); // State for error message.

  useEffect(() => {
    fetchGoalsAndWorkouts();
  }, []);

  // Function to fetch goals and workouts for the current user.
  const fetchGoalsAndWorkouts = async () => {
    if (session?.user.id) {
      setIsLoading(true);
      try {
        const goalService = new GoalService(); // Initialize the GoalService.
        const workoutService = new WorkoutService(); // Initialize the WorkoutService.

        const goalsData = await goalService.findAllByUserId(session?.user.id); // Fetch goals for the user.
        const workoutsData = await workoutService.findAllByUserId(session?.user.id); // Fetch workouts for the user.

        useStore.setState({ goals: goalsData, workouts: workoutsData }); // Update the global state with fetched data.
        setIsLoading(false);
      } catch (error) {
        // Handle potential errors during data fetching.
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

  // Conditional rendering based on authentication status and loading state.
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
          Please log in to view your dashboard.
        </Typography>
      </div>
    );
  }

  // Main dashboard content.
  return (
    <div className="flex h-screen">
      {/* Sidebar component, only shown on larger screens (above md breakpoint) */}
      <Sidebar className="hidden md:block w-64 bg-gray-800 text-white" />
      {/* Main content area */}
      <main className="flex flex-col flex-1 bg-gray-100 overflow-auto">
        {/* Header component */}
        <Header />
        {/* Content area */}
        <div className="p-4 flex flex-1 flex-col">
          {children}
        </div>
        {/* Footer component */}
        <Footer className="mt-auto" />
      </main>
    </div>
  );
}