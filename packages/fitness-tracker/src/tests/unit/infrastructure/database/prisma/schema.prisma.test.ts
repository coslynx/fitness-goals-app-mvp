import { PrismaClient } from '@prisma/client';
import { User } from '../../../../../src/domain/users/entities/User';
import { Goal } from '../../../../../src/domain/goals/entities/Goal';
import { Workout } from '../../../../../src/domain/workouts/entities/Workout';

describe('Prisma Schema', () => {
  let prisma: PrismaClient;

  beforeEach(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should define the User model with the correct properties', async () => {
    const user: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const createdUser = await prisma.user.create({
      data: user,
    });

    expect(createdUser).toBeDefined();
    expect(createdUser.email).toBe(user.email);
    expect(createdUser.password).toBe(user.password);
  });

  it('should define the Goal model with the correct properties', async () => {
    const goal: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const createdGoal = await prisma.goal.create({
      data: goal,
    });

    expect(createdGoal).toBeDefined();
    expect(createdGoal.title).toBe(goal.title);
    expect(createdGoal.description).toBe(goal.description);
    expect(createdGoal.target).toBe(goal.target);
    expect(createdGoal.deadline).toEqual(goal.deadline);
    expect(createdGoal.userId).toBe(goal.userId);
  });

  it('should define the Workout model with the correct properties', async () => {
    const workout: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const createdWorkout = await prisma.workout.create({
      data: workout,
    });

    expect(createdWorkout).toBeDefined();
    expect(createdWorkout.type).toBe(workout.type);
    expect(createdWorkout.duration).toBe(workout.duration);
    expect(createdWorkout.intensity).toBe(workout.intensity);
    expect(createdWorkout.caloriesBurned).toBe(workout.caloriesBurned);
    expect(createdWorkout.date).toEqual(workout.date);
    expect(createdWorkout.userId).toBe(workout.userId);
  });
});