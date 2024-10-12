import { CreateWorkout } from '../../../../../src/domain/workouts/usecases/CreateWorkout';
import { WorkoutRepository } from '../../../../../src/domain/workouts/repositories/WorkoutRepository';
import { Workout } from '../../../../../src/domain/workouts/entities/Workout';

describe('CreateWorkout', () => {
  let createWorkout: CreateWorkout;
  let workoutRepository: WorkoutRepository;

  beforeEach(() => {
    workoutRepository = new WorkoutRepository();
    createWorkout = new CreateWorkout(workoutRepository);
  });

  it('should successfully create a new workout', async () => {
    const workoutData: Workout = {
      id: 'test-workout-id',
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    jest.spyOn(workoutRepository, 'create').mockResolvedValue(workoutData);

    const createdWorkout = await createWorkout.execute(workoutData);

    expect(workoutRepository.create).toHaveBeenCalledWith(workoutData);
    expect(createdWorkout).toEqual(workoutData);
  });

  it('should throw an error if workout creation fails', async () => {
    const workoutData: Workout = {
      id: 'test-workout-id',
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const error = new Error('Failed to create workout');
    jest.spyOn(workoutRepository, 'create').mockRejectedValue(error);

    await expect(createWorkout.execute(workoutData)).rejects.toThrowError(
      `Failed to create workout: ${error.message}`
    );
  });
});