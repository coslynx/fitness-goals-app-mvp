import { User } from '../../../../../src/domain/users/entities/User';
import { Goal } from '../../../../../src/domain/goals/entities/Goal';
import { Workout } from '../../../../../src/domain/workouts/entities/Workout';

describe('User', () => {
  it('should create a new user with valid properties', () => {
    const userData: User = {
      id: 'test-user-id',
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const user = new User(userData);

    expect(user.id).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.password).toBe(userData.password);
  });

  it('should add and remove goals correctly', () => {
    const userData: User = {
      id: 'test-user-id',
      email: 'test@example.com',
    };

    const user = new User(userData);

    const goal1: Goal = {
      id: 'test-goal-id-1',
      title: 'Test Goal 1',
      description: 'Test Goal Description 1',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const goal2: Goal = {
      id: 'test-goal-id-2',
      title: 'Test Goal 2',
      description: 'Test Goal Description 2',
      target: 15,
      deadline: new Date('2025-01-01'),
      userId: 'user123',
    };

    user.addGoal(goal1);
    expect(user.goals).toContainEqual(goal1);

    user.addGoal(goal2);
    expect(user.goals).toContainEqual(goal1);
    expect(user.goals).toContainEqual(goal2);

    user.removeGoal(goal1.id);
    expect(user.goals).not.toContainEqual(goal1);
    expect(user.goals).toContainEqual(goal2);
  });

  it('should add and remove workouts correctly', () => {
    const userData: User = {
      id: 'test-user-id',
      email: 'test@example.com',
    };

    const user = new User(userData);

    const workout1: Workout = {
      id: 'test-workout-id-1',
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const workout2: Workout = {
      id: 'test-workout-id-2',
      type: 'Weightlifting',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 400,
      date: new Date('2023-12-21'),
      userId: 'user123',
    };

    user.addWorkout(workout1);
    expect(user.workouts).toContainEqual(workout1);

    user.addWorkout(workout2);
    expect(user.workouts).toContainEqual(workout1);
    expect(user.workouts).toContainEqual(workout2);

    user.removeWorkout(workout1.id);
    expect(user.workouts).not.toContainEqual(workout1);
    expect(user.workouts).toContainEqual(workout2);
  });
});