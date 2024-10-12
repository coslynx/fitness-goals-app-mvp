"use client";

import { render, screen } from "@testing-library/react";
import Footer from "../../../../../src/presentation/components/organisms/Footer";
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

describe("Footer", () => {
  it("should render the footer with correct content when authenticated", () => {
    render(
      <SessionProvider session={{ user: { id: "test-user-id", email: "test@example.com", name: "Test User" } }}>
        <Provider store={useStore}>
          <Footer />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Track Your Fitness Goals Easily Now")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Goals")).toBeInTheDocument();
    expect(screen.getByText("Workouts")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText(`&copy; ${new Date().getFullYear()}`)).toBeInTheDocument();
  });

  it("should render the footer with correct content when unauthenticated", () => {
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
          <Footer />
        </Provider>
      </SessionProvider>
    );

    expect(screen.getByText("Track Your Fitness Goals Easily Now")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText(`&copy; ${new Date().getFullYear()}`)).toBeInTheDocument();
  });
});