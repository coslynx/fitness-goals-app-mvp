"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStore } from "@/presentation/hooks/useStore";

/**
 * @file packages/fitness-tracker/src/presentation/pages/page.tsx
 * @description The main landing page of the application.
 * @author CosLynxAI
 */

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { goals, workouts } = useStore();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Track Your Fitness Goals Easily Now
        </h1>
        <p className="text-gray-500 mb-6">
          Start your fitness journey today! Set goals, track your progress, and
          stay motivated.
        </p>
        <button
          onClick={() => router.push("/auth/login")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Log In
        </button>
        <button
          onClick={() => router.push("/auth/register")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Display some welcome message or statistics if logged in */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome back, {session?.user?.name}!
      </h1>
      <p className="text-gray-500 mb-6">
        You have {goals.length} goals and {workouts.length} workouts logged.
      </p>
    </div>
  );
}