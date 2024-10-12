"use client";

import { render, screen } from "@testing-library/react";
import AuthLayout from "../../../../../src/presentation/components/templates/AuthLayout";
import { SessionProvider } from "next-auth/react"; // Version 4.24.8 - For user authentication and session management
import { Provider } from "zustand"; // v5.0.0-rc.2 - For managing global state
import { useStore } from "../../../../../src/presentation/hooks/useStore"; // For accessing global state using Zustand

// Mock the useSession hook for testing
jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => ({
    data: {
      user: {
        id: "test-user-id",
        email: "test@example.com",
        name: "Test User",
      },
    },
    status: "authenticated",
  }),
}));

// Mock the useStore hook for testing
jest.mock("../../../../../src/presentation/hooks/useStore", () => ({
  ...jest.requireActual("../../../../../src/presentation/hooks/useStore"),
  useStore: () => ({
    goals: [],
    workouts: [],
  }),
}));

describe("AuthLayout", () => {
  it("should render the AuthLayout component with correct content when authenticated", () => {
    render(
      <SessionProvider session={{ user: { id: "test-user-id", email: "test@example.com", name: "Test User" } }}>
        <Provider store={useStore}>
          <AuthLayout>
            <div>Child Content</div>
          </AuthLayout>
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Track Your Fitness Goals Easily Now")).toBeInTheDocument();
    expect(screen.getByText("Welcome, Test User!")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should render the AuthLayout component with correct content when unauthenticated", () => {
    // Mock useSession to simulate unauthenticated state
    jest.mock("next-auth/react", () => ({
      ...jest.requireActual("next-auth/react"),
      useSession: () => ({
        data: null,
        status: "unauthenticated",
      }),
    }));

    render(
      <SessionProvider session={null}>
        <Provider store={useStore}>
          <AuthLayout>
            <div>Child Content</div>
          </AuthLayout>
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Track Your Fitness Goals Easily Now")).toBeInTheDocument();
    expect(screen.getByText("Please log in to continue.")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});