"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react"; // v4.24.8
import { useRouter } from "next/navigation";
import { useStore } from "@/presentation/hooks/useStore";
import { FormField } from "@/presentation/components/molecules/FormField";
import { Button } from "@/presentation/components/atoms/Button";
import { Input } from "@/presentation/components/atoms/Input";
import { Typography } from "@/presentation/components/atoms/Typography";

/**
 * @file packages/fitness-tracker/src/presentation/pages/(auth)/login/page.tsx
 * @description Implements the login page for user authentication within the fitness tracker application.
 * @author CosLynxAI
 */
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { goals, workouts } = useStore();

  // Function to handle form submission for user login
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Attempt to sign in the user using the provided email and password.
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      // Check the authentication status after the sign-in attempt.
      const { data: session, status } = useSession();

      // If authentication is successful, redirect to the dashboard.
      if (status === "authenticated") {
        router.push("/dashboard");
      }

      // If authentication fails, display an error message.
    } catch (error) {
      // Handle potential errors during authentication:
      if (error instanceof Error) {
        setError(error.message); // Set the error message in the state.
      } else {
        setError("An error occurred. Please try again later."); // Display a generic error message if the error type is unknown.
      }
    }
  };

  // Conditional rendering based on authentication status
  if (status === "loading") {
    return <div>Loading...</div>; // Display a loading indicator while authentication is in progress.
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Display a welcome message or redirect to the dashboard if the user is already authenticated. */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-gray-500 mb-6">
          You have {goals.length} goals and {workouts.length} workouts logged.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Render the login form
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Typography variant="h1" className="text-4xl font-bold text-gray-800 mb-4">
        Log In to Track Your Fitness Goals Easily Now
      </Typography>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Email input field */}
        <FormField label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </FormField>
        {/* Password input field */}
        <FormField label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </FormField>
        {/* Error message display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {/* Login button */}
        <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Log In
        </Button>
      </form>
      {/* Link to the registration page */}
      <Typography variant="p" className="text-gray-500 text-center">
        Don't have an account?{" "}
        <a href="/auth/register" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </a>
      </Typography>
    </div>
  );
}