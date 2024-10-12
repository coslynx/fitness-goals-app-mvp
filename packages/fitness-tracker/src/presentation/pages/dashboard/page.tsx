"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // v4.24.8 
import { useStore } from "@/presentation/hooks/useStore"; // For accessing global state using Zustand
import { GoalService } from "@/infrastructure/api/services/GoalService"; // For goal-related business logic
import { WorkoutService } from "@/infrastructure/api/services/WorkoutService"; // For workout-related business logic
import { Chart } from "chart.js"; // v4.4.4 - For creating charts to visualize data
import { Typography } from "@/presentation/components/atoms/Typography"; // For displaying text 
import { GoalCard } from "@/presentation/components/molecules/GoalCard"; // For displaying individual goals
import { WorkoutCard } from "@/presentation/components/molecules/WorkoutCard"; // For displaying individual workouts
import { DashboardLayout } from "@/presentation/components/templates/DashboardLayout"; // For defining the dashboard layout structure

/**
 * @file packages/fitness-tracker/src/presentation/pages/dashboard/page.tsx
 * @description Implements the dashboard page, providing a user-centric view of their fitness goals and workout progress.
 * @author CosLynxAI
 */
export default function DashboardPage() {
  const { data: session, status } = useSession(); // Get the user session data
  const router = useRouter(); // Create a router instance for client-side navigation
  const { goals, workouts } = useStore(); // Access the global state using Zustand
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    // Fetch goals and workouts on initial page load
    fetchGoalsAndWorkouts();

    // Set up the progress chart for goals and workouts
    const canvas = document.getElementById("progressChart");
    if (canvas) {
      setChartInstance(
        new Chart(canvas, {
          type: "bar", // Create a bar chart
          data: {
            labels: ["Goals", "Workouts"],
            datasets: [
              {
                label: "Progress",
                data: [goals.length, workouts.length], // Data for the chart (goal count and workout count)
                backgroundColor: ["#36a2eb", "#ff6384"], // Colors for the bars
              },
            ],
          },
          options: {
            responsive: true, // Make the chart responsive to screen size
            scales: {
              y: {
                beginAtZero: true, // Start the Y-axis at zero
              },
            },
          },
        })
      );
    }
  }, []);

  // Function to fetch goals and workouts for the current user
  const fetchGoalsAndWorkouts = async () => {
    if (session?.user.id) {
      try {
        const goalService = new GoalService(); // Initialize the GoalService
        const workoutService = new WorkoutService(); // Initialize the WorkoutService

        const goalsData = await goalService.findAllByUserId(session?.user.id); // Fetch goals for the user
        const workoutsData = await workoutService.findAllByUserId(
          session?.user.id
        ); // Fetch workouts for the user

        useStore.setState({ goals: goalsData, workouts: workoutsData }); // Update the global state with fetched data
      } catch (error) {
        // Handle potential errors during data fetching
        if (error instanceof Error) {
          console.error("Error fetching goals and workouts:", error);
          // Display an error message to the user
        } else {
          console.error(
            "An unexpected error occurred while fetching data."
          );
        }
      }
    }
  };

  useEffect(() => {
    // Update the chart data when goals or workouts change
    if (chartInstance && goals && workouts) {
      chartInstance.data.datasets[0].data = [goals.length, workouts.length];
      chartInstance.update();
    }
  }, [goals.length, workouts.length]);

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
          Please log in to view your dashboard
        </Typography>
      </div>
    );
  }

  // Main dashboard content
  return (
    <DashboardLayout>
      <Typography variant="h1" className="text-4xl font-bold text-gray-800 mb-4">
        Your Fitness Dashboard
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Display goals in a grid */}
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}

        {/* Display workouts in a grid */}
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>

      {/* Display progress chart for goals and workouts */}
      <div className="mt-8">
        <Typography variant="h2" className="text-2xl font-bold text-gray-800 mb-2">
          Your Progress
        </Typography>
        <canvas id="progressChart" />
      </div>
    </DashboardLayout>
  );
}