"use client";

import { render, screen } from "@testing-library/react";
import Sidebar from "../../../../../src/presentation/components/organisms/Sidebar";
import { SessionProvider } from "next-auth/react";
import { Provider } from "zustand";
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

describe("Sidebar", () => {
  it("should render the sidebar with correct navigation items when authenticated", () => {
    render(
      <SessionProvider session={{ user: { id: "test-user-id", email: "test@example.com", name: "Test User" } }}>
        <Provider store={useStore}>
          <Sidebar />
        </Provider>
      </SessionProvider>
    );

    // Check for the presence of expected navigation items
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Goals")).toBeInTheDocument();
    expect(screen.getByText("Workouts")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("should render the sidebar with correct navigation items when unauthenticated", () => {
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
          <Sidebar />
        </Provider>
      </SessionProvider>
    );

    // Check for the presence of expected navigation items
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
});