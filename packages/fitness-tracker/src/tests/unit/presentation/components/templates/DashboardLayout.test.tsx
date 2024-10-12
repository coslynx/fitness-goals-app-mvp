"use client";

import { render, screen } from "@testing-library/react";
import { Provider } from "zustand";
import { SessionProvider } from "next-auth/react";
import { DashboardLayout } from "../../../../../src/presentation/components/templates/DashboardLayout";
import { useStore } from "../../../../../src/presentation/hooks/useStore";

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

describe("DashboardLayout", () => {
  it("should render the DashboardLayout component with correct content when authenticated", () => {
    render(
      <SessionProvider session={{ user: { id: "test-user-id", email: "test@example.com", name: "Test User" } }}>
        <Provider store={useStore}>
          <DashboardLayout>
            <div>Child Content</div>
          </DashboardLayout>
        </Provider>
      </SessionProvider>
    );

    // Check for the presence of expected elements within the DashboardLayout
    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument(); // Header
    expect(screen.getByText("Dashboard")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Goals")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Workouts")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Profile")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Settings")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Logout")).toBeInTheDocument(); // Header
    expect(screen.getByText("Child Content")).toBeInTheDocument(); // Content Area
  });

  it("should render the DashboardLayout component with correct content when unauthenticated", () => {
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
          <DashboardLayout>
            <div>Child Content</div>
          </DashboardLayout>
        </Provider>
      </SessionProvider>
    );

    // Check for the presence of expected elements within the DashboardLayout
    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument(); // Header
    expect(screen.getByText("Login")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Register")).toBeInTheDocument(); // Sidebar
    expect(screen.getByText("Child Content")).toBeInTheDocument(); // Content Area
  });
});