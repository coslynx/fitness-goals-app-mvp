import { UpdateWorkout } from '../../../../../src/domain/workouts/usecases/UpdateWorkout';
import { WorkoutRepository } from '../../../../../src/domain/workouts/repositories/WorkoutRepository';
import { Workout } from '../../../../../src/domain/workouts/entities/Workout';

describe('UpdateWorkout', () => {
  let updateWorkout: UpdateWorkout;
  let workoutRepository: WorkoutRepository;

  beforeEach(() => {
    workoutRepository = new WorkoutRepository();
    updateWorkout = new UpdateWorkout(workoutRepository);
  });

  it('should successfully update a workout', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
      duration: 45,
    };
    const existingWorkout: Workout = {
      id: workoutId,
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    jest.spyOn(workoutRepository, 'findById').mockResolvedValue(existingWorkout);
    jest.spyOn(workoutRepository, 'update').mockResolvedValue(existingWorkout);

    const updatedWorkout = await updateWorkout.execute(workoutId, workoutData);

    expect(workoutRepository.findById).toHaveBeenCalledWith(workoutId);
    expect(workoutRepository.update).toHaveBeenCalledWith(workoutId, existingWorkout);
    expect(updatedWorkout.type).toBe(workoutData.type);
    expect(updatedWorkout.duration).toBe(workoutData.duration);
  });

  it('should throw an error if the workout is not found', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
      duration: 45,
    };
    jest.spyOn(workoutRepository, 'findById').mockResolvedValue(null);

    await expect(updateWorkout.execute(workoutId, workoutData)).rejects.toThrowError(
      `Workout with ID ${workoutId} not found.`
    );
  });

  it('should throw an error if workout update fails', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
      duration: 45,
    };
    const existingWorkout: Workout = {
      id: workoutId,
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const error = new Error('Failed to update workout');
    jest.spyOn(workoutRepository, 'findById').mockResolvedValue(existingWorkout);
    jest.spyOn(workoutRepository, 'update').mockRejectedValue(error);

    await expect(updateWorkout.execute(workoutId, workoutData)).rejects.toThrowError(
      `Failed to update workout: ${error.message}`
    );
  });
});