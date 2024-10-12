"use client";

import { render, screen } from "@testing-library/react";
import Header from "../../../../../src/presentation/components/organisms/Header";
import { SessionProvider } from "next-auth/react"; // v4.24.8 - For user authentication and session management
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

describe("Header", () => {
  it("should render the Header component with correct content when authenticated", () => {
    render(
      <SessionProvider session={{ user: { id: "test-user-id", email: "test@example.com", name: "Test User" } }}>
        <Provider store={useStore}>
          <Header />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Goals")).toBeInTheDocument();
    expect(screen.getByText("Workouts")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("should render the Header component with correct content when unauthenticated", () => {
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
          <Header />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Fitness Tracker")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
});