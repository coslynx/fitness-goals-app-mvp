"use client";

import { describe, expect, it, vi } from "vitest";
import { ApiService } from "../../../../../src/presentation/services/api";
import { Goal } from "../../../../../src/domain/goals/entities/Goal";
import { Workout } from "../../../../../src/domain/workouts/entities/Workout";
import { GoalService } from "../../../../../src/infrastructure/api/services/GoalService";
import { WorkoutService } from "../../../../../src/infrastructure/api/services/WorkoutService";
import { User } from "../../../../../src/domain/users/entities/User";
import { Session } from "next-auth/react";

vi.mock("../../../../../src/infrastructure/api/services/GoalService");
vi.mock("../../../../../src/infrastructure/api/services/WorkoutService");
vi.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: () => ({
    data: {
      user: {
        id: "test-user-id",
        email: "test@example.com",
        name: "Test User",
      },
    } as Session,
    status: "authenticated",
  }),
}));

describe("ApiService", () => {
  let apiService: ApiService;
  let goalServiceMock: GoalService;
  let workoutServiceMock: WorkoutService;

  beforeEach(() => {
    goalServiceMock = new GoalService();
    workoutServiceMock = new WorkoutService();
    apiService = new ApiService(goalServiceMock, workoutServiceMock);
  });

  it("should successfully fetch all goals for the current user", async () => {
    const mockGoals: Goal[] = [
      {
        id: "goal1-id",
        title: "Test Goal 1",
        description: "Test Goal Description 1",
        target: 10,
        deadline: new Date("2024-12-31"),
        userId: "test-user-id",
      },
    ];
    vi.spyOn(goalServiceMock, "findAllByUserId").mockResolvedValue(mockGoals);

    const goals = await apiService.fetchAllGoals();

    expect(goalServiceMock.findAllByUserId).toHaveBeenCalledWith("test-user-id");
    expect(goals).toEqual(mockGoals);
  });

  it("should throw an error if user is not authenticated", async () => {
    vi.mock("next-auth/react", () => ({
      ...jest.requireActual("next-auth/react"),
      useSession: () => ({
        data: null,
        status: "unauthenticated",
      }),
    }));

    await expect(apiService.fetchAllGoals()).rejects.toThrowError(
      "User is not authenticated."
    );
  });

  it("should successfully fetch a goal by ID", async () => {
    const goalId = "goal1-id";
    const mockGoal: Goal = {
      id: goalId,
      title: "Test Goal",
      description: "Test Goal Description",
      target: 10,
      deadline: new Date("2024-12-31"),
      userId: "test-user-id",
    };
    vi.spyOn(goalServiceMock, "findById").mockResolvedValue(mockGoal);

    const goal = await apiService.fetchGoalById(goalId);

    expect(goalServiceMock.findById).toHaveBeenCalledWith(goalId);
    expect(goal).toEqual(mockGoal);
  });

  it("should return null if goal is not found", async () => {
    const goalId = "goal1-id";
    vi.spyOn(goalServiceMock, "findById").mockResolvedValue(null);

    const goal = await apiService.fetchGoalById(goalId);

    expect(goalServiceMock.findById).toHaveBeenCalledWith(goalId);
    expect(goal).toBeNull();
  });

  it("should successfully create a new goal", async () => {
    const goalData: Goal = {
      id: "test-goal-id",
      title: "Test Goal",
      description: "Test Goal Description",
      target: 10,
      deadline: new Date("2024-12-31"),
      userId: "test-user-id",
    };
    vi.spyOn(goalServiceMock, "create").mockResolvedValue(goalData);

    const createdGoal = await apiService.createGoal(goalData);

    expect(goalServiceMock.create).toHaveBeenCalledWith(goalData);
    expect(createdGoal).toEqual(goalData);
  });

  it("should throw an error if goal creation fails", async () => {
    const goalData: Goal = {
      id: "test-goal-id",
      title: "Test Goal",
      description: "Test Goal Description",
      target: 10,
      deadline: new Date("2024-12-31"),
      userId: "test-user-id",
    };
    const error = new Error("Failed to create goal");
    vi.spyOn(goalServiceMock, "create").mockRejectedValue(error);

    await expect(apiService.createGoal(goalData)).rejects.toThrowError(
      `Failed to create goal: ${error.message}`
    );
  });

  it("should successfully update an existing goal", async () => {
    const goalId = "goal1-id";
    const updatedGoalData: Partial<Goal> = {
      title: "Updated Goal Title",
    };
    const mockGoal: Goal = {
      id: goalId,
      title: "Test Goal",
      description: "Test Goal Description",
      target: 10,
      deadline: new Date("2024-12-31"),
      userId: "test-user-id",
    };
    vi.spyOn(goalServiceMock, "update").mockResolvedValue(mockGoal);

    const updatedGoal = await apiService.updateGoal(goalId, updatedGoalData);

    expect(goalServiceMock.update).toHaveBeenCalledWith(goalId, updatedGoalData);
    expect(updatedGoal).toEqual(mockGoal);
  });

  it("should throw an error if goal update fails", async () => {
    const goalId = "goal1-id";
    const updatedGoalData: Partial<Goal> = {
      title: "Updated Goal Title",
    };
    const error = new Error("Failed to update goal");
    vi.spyOn(goalServiceMock, "update").mockRejectedValue(error);

    await expect(apiService.updateGoal(goalId, updatedGoalData)).rejects.toThrowError(
      `Failed to update goal with ID ${goalId}: ${error.message}`
    );
  });

  it("should successfully delete a goal", async () => {
    const goalId = "goal1-id";
    vi.spyOn(goalServiceMock, "delete").mockResolvedValue(undefined);

    await apiService.deleteGoal(goalId);

    expect(goalServiceMock.delete).toHaveBeenCalledWith(goalId);
  });

  it("should throw an error if goal deletion fails", async () => {
    const goalId = "goal1-id";
    const error = new Error("Failed to delete goal");
    vi.spyOn(goalServiceMock, "delete").mockRejectedValue(error);

    await expect(apiService.deleteGoal(goalId)).rejects.toThrowError(
      `Failed to delete goal with ID ${goalId}: ${error.message}`
    );
  });

  it("should successfully fetch all workouts for the current user", async () => {
    const mockWorkouts: Workout[] = [
      {
        id: "workout1-id",
        type: "Running",
        duration: 30,
        intensity: "Moderate",
        caloriesBurned: 300,
        date: new Date("2023-12-20"),
        userId: "test-user-id",
      },
    ];
    vi.spyOn(workoutServiceMock, "findAllByUserId").mockResolvedValue(mockWorkouts);

    const workouts = await apiService.fetchAllWorkouts();

    expect(workoutServiceMock.findAllByUserId).toHaveBeenCalledWith(
      "test-user-id"
    );
    expect(workouts).toEqual(mockWorkouts);
  });

  it("should throw an error if user is not authenticated", async () => {
    vi.mock("next-auth/react", () => ({
      ...jest.requireActual("next-auth/react"),
      useSession: () => ({
        data: null,
        status: "unauthenticated",
      }),
    }));

    await expect(apiService.fetchAllWorkouts()).rejects.toThrowError(
      "User is not authenticated."
    );
  });

  it("should successfully fetch a workout by ID", async () => {
    const workoutId = "workout1-id";
    const mockWorkout: Workout = {
      id: workoutId,
      type: "Running",
      duration: 30,
      intensity: "Moderate",
      caloriesBurned: 300,
      date: new Date("2023-12-20"),
      userId: "test-user-id",
    };
    vi.spyOn(workoutServiceMock, "findById").mockResolvedValue(mockWorkout);

    const workout = await apiService.fetchWorkoutById(workoutId);

    expect(workoutServiceMock.findById).toHaveBeenCalledWith(workoutId);
    expect(workout).toEqual(mockWorkout);
  });

  it("should return null if workout is not found", async () => {
    const workoutId = "workout1-id";
    vi.spyOn(workoutServiceMock, "findById").mockResolvedValue(null);

    const workout = await apiService.fetchWorkoutById(workoutId);

    expect(workoutServiceMock.findById).toHaveBeenCalledWith(workoutId);
    expect(workout).toBeNull();
  });

  it("should successfully create a new workout", async () => {
    const workoutData: Workout = {
      id: "test-workout-id",
      type: "Running",
      duration: 30,
      intensity: "Moderate",
      caloriesBurned: 300,
      date: new Date("2023-12-20"),
      userId: "test-user-id",
    };
    vi.spyOn(workoutServiceMock, "create").mockResolvedValue(workoutData);

    const createdWorkout = await apiService.createWorkout(workoutData);

    expect(workoutServiceMock.create).toHaveBeenCalledWith(workoutData);
    expect(createdWorkout).toEqual(workoutData);
  });

  it("should throw an error if workout creation fails", async () => {
    const workoutData: Workout = {
      id: "test-workout-id",
      type: "Running",
      duration: 30,
      intensity: "Moderate",
      caloriesBurned: 300,
      date: new Date("2023-12-20"),
      userId: "test-user-id",
    };
    const error = new Error("Failed to create workout");
    vi.spyOn(workoutServiceMock, "create").mockRejectedValue(error);

    await expect(apiService.createWorkout(workoutData)).rejects.toThrowError(
      `Failed to create workout: ${error.message}`
    );
  });

  it("should successfully update an existing workout", async () => {
    const workoutId = "workout1-id";
    const updatedWorkoutData: Partial<Workout> = {
      type: "Weightlifting",
    };
    const mockWorkout: Workout = {
      id: workoutId,
      type: "Running",
      duration: 30,
      intensity: "Moderate",
      caloriesBurned: 300,
      date: new Date("2023-12-20"),
      userId: "test-user-id",
    };
    vi.spyOn(workoutServiceMock, "update").mockResolvedValue(mockWorkout);

    const updatedWorkout = await apiService.updateWorkout(
      workoutId,
      updatedWorkoutData
    );

    expect(workoutServiceMock.update).toHaveBeenCalledWith(
      workoutId,
      updatedWorkoutData
    );
    expect(updatedWorkout).toEqual(mockWorkout);
  });

  it("should throw an error if workout update fails", async () => {
    const workoutId = "workout1-id";
    const updatedWorkoutData: Partial<Workout> = {
      type: "Weightlifting",
    };
    const error = new Error("Failed to update workout");
    vi.spyOn(workoutServiceMock, "update").mockRejectedValue(error);

    await expect(apiService.updateWorkout(workoutId, updatedWorkoutData)).rejects.toThrowError(
      `Failed to update workout with ID ${workoutId}: ${error.message}`
    );
  });

  it("should successfully delete a workout", async () => {
    const workoutId = "workout1-id";
    vi.spyOn(workoutServiceMock, "delete").mockResolvedValue(undefined);

    await apiService.deleteWorkout(workoutId);

    expect(workoutServiceMock.delete).toHaveBeenCalledWith(workoutId);
  });

  it("should throw an error if workout deletion fails", async () => {
    const workoutId = "workout1-id";
    const error = new Error("Failed to delete workout");
    vi.spyOn(workoutServiceMock, "delete").mockRejectedValue(error);

    await expect(apiService.deleteWorkout(workoutId)).rejects.toThrowError(
      `Failed to delete workout with ID ${workoutId}: ${error.message}`
    );
  });

  it("should successfully generate a JWT token for a user", async () => {
    const mockUser: User = {
      id: "test-user-id",
      email: "test@example.com",
      password: "testPassword123",
    };
    vi.spyOn(apiService, "generateToken").mockResolvedValue("jwt-token");

    const token = await apiService.generateToken(mockUser);

    expect(apiService.generateToken).toHaveBeenCalledWith(mockUser);
    expect(token).toBe("jwt-token");
  });

  it("should throw an error if JWT token generation fails", async () => {
    const mockUser: User = {
      id: "test-user-id",
      email: "test@example.com",
      password: "testPassword123",
    };
    const error = new Error("Failed to generate token");
    vi.spyOn(apiService, "generateToken").mockRejectedValue(error);

    await expect(apiService.generateToken(mockUser)).rejects.toThrowError(
      `Failed to generate token: ${error.message}`
    );
  });

  it("should successfully make an API request", async () => {
    const mockApiResponse = {
      data: {
        message: "API request successful",
      },
    };
    vi.spyOn(axios, "default").mockResolvedValue(mockApiResponse);

    const response = await apiService.makeApiRequest(
      "http://localhost:3000/api/test"
    );

    expect(axios.default).toHaveBeenCalledWith({
      method: "GET",
      url: "http://localhost:3000/api/test",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer jwt-token`, // jwt-token mocked in useSession
      },
    });
    expect(response).toEqual(mockApiResponse);
  });

  it("should throw an error if API request fails", async () => {
    const mockError = new Error("API request failed");
    vi.spyOn(axios, "default").mockRejectedValue(mockError);

    await expect(
      apiService.makeApiRequest("http://localhost:3000/api/test")
    ).rejects.toThrowError(mockError);
  });
});