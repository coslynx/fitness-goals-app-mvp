import { WorkoutService } from '../../../../../src/infrastructure/api/services/WorkoutService';
import { Workout } from '../../../../../src/domain/workouts/entities/Workout';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('WorkoutService', () => {
  let workoutService: WorkoutService;

  beforeEach(() => {
    workoutService = new WorkoutService(prisma);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should successfully create a new workout', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const createdWorkout = await workoutService.create(workoutData);

    expect(createdWorkout).toBeDefined();
    expect(createdWorkout.id).toBeDefined();
    expect(createdWorkout.type).toBe(workoutData.type);
    expect(createdWorkout.duration).toBe(workoutData.duration);
    expect(createdWorkout.intensity).toBe(workoutData.intensity);
    expect(createdWorkout.caloriesBurned).toBe(workoutData.caloriesBurned);
    expect(createdWorkout.date).toEqual(workoutData.date);
    expect(createdWorkout.userId).toBe(workoutData.userId);
  });

  it('should successfully find a workout by ID', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const createdWorkout = await workoutService.create(workoutData);

    const foundWorkout = await workoutService.findById(createdWorkout.id);

    expect(foundWorkout).toBeDefined();
    expect(foundWorkout?.id).toBe(createdWorkout.id);
    expect(foundWorkout?.type).toBe(workoutData.type);
    expect(foundWorkout?.duration).toBe(workoutData.duration);
    expect(foundWorkout?.intensity).toBe(workoutData.intensity);
    expect(foundWorkout?.caloriesBurned).toBe(workoutData.caloriesBurned);
    expect(foundWorkout?.date).toEqual(workoutData.date);
    expect(foundWorkout?.userId).toBe(workoutData.userId);
  });

  it('should successfully find all workouts', async () => {
    const workoutData1: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const workoutData2: Workout = {
      type: 'Weightlifting',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 400,
      date: new Date('2023-12-21'),
      userId: 'user123',
    };

    await workoutService.create(workoutData1);
    await workoutService.create(workoutData2);

    const workouts = await workoutService.findAll();

    expect(workouts).toBeDefined();
    expect(workouts.length).toBe(2);
    expect(workouts.some((workout) => workout.id === workoutData1.id)).toBe(true);
    expect(workouts.some((workout) => workout.id === workoutData2.id)).toBe(true);
  });

  it('should successfully update a workout', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const createdWorkout = await workoutService.create(workoutData);

    const updatedWorkoutData: Partial<Workout> = {
      type: 'Weightlifting',
      duration: 45,
    };

    const updatedWorkout = await workoutService.update(createdWorkout.id, updatedWorkoutData);

    expect(updatedWorkout).toBeDefined();
    expect(updatedWorkout.id).toBe(createdWorkout.id);
    expect(updatedWorkout.type).toBe(updatedWorkoutData.type);
    expect(updatedWorkout.duration).toBe(updatedWorkoutData.duration);
    expect(updatedWorkout.intensity).toBe(workoutData.intensity); // Intensity should remain unchanged
    expect(updatedWorkout.caloriesBurned).toBe(workoutData.caloriesBurned); // CaloriesBurned should remain unchanged
    expect(updatedWorkout.date).toEqual(workoutData.date); // Date should remain unchanged
    expect(updatedWorkout.userId).toBe(workoutData.userId); // User ID should remain unchanged
  });

  it('should successfully delete a workout', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const createdWorkout = await workoutService.create(workoutData);

    await workoutService.delete(createdWorkout.id);

    const foundWorkout = await workoutService.findById(createdWorkout.id);

    expect(foundWorkout).toBeNull();
  });

  it('should throw an error if workout creation fails', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    jest.spyOn(prisma.workout, 'create').mockRejectedValue(new Error('Failed to create workout'));

    await expect(workoutService.create(workoutData)).rejects.toThrowError(
      'Failed to create workout: Failed to create workout'
    );
  });

  it('should throw an error if workout finding by ID fails', async () => {
    const workoutId = 'test-workout-id';

    jest.spyOn(prisma.workout, 'findUnique').mockRejectedValue(new Error('Failed to find workout'));

    await expect(workoutService.findById(workoutId)).rejects.toThrowError('Failed to find workout');
  });

  it('should throw an error if finding all workouts by user ID fails', async () => {
    jest.spyOn(prisma.workout, 'findMany').mockRejectedValue(new Error('Failed to find workouts'));

    await expect(workoutService.findAll()).rejects.toThrowError('Failed to find workouts');
  });

  it('should throw an error if workout update fails', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
      duration: 45,
    };

    jest.spyOn(prisma.workout, 'update').mockRejectedValue(new Error('Failed to update workout'));

    await expect(workoutService.update(workoutId, workoutData)).rejects.toThrowError(
      'Failed to update workout: Failed to update workout'
    );
  });

  it('should throw an error if workout deletion fails', async () => {
    const workoutId = 'test-workout-id';

    jest.spyOn(prisma.workout, 'delete').mockRejectedValue(new Error('Failed to delete workout'));

    await expect(workoutService.delete(workoutId)).rejects.toThrowError('Failed to delete workout');
  });
});