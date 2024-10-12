import { DeleteWorkout } from '../../../../../src/domain/workouts/usecases/DeleteWorkout';
import { WorkoutRepository } from '../../../../../src/domain/workouts/repositories/WorkoutRepository';

describe('DeleteWorkout', () => {
  let deleteWorkout: DeleteWorkout;
  let workoutRepository: WorkoutRepository;

  beforeEach(() => {
    workoutRepository = new WorkoutRepository();
    deleteWorkout = new DeleteWorkout(workoutRepository);
  });

  it('should successfully delete a workout', async () => {
    const workoutId = 'test-workout-id';
    jest.spyOn(workoutRepository, 'delete').mockResolvedValue(undefined);

    await deleteWorkout.execute(workoutId);

    expect(workoutRepository.delete).toHaveBeenCalledWith(workoutId);
  });

  it('should throw an error if workout deletion fails', async () => {
    const workoutId = 'test-workout-id';
    const error = new Error('Failed to delete workout');
    jest.spyOn(workoutRepository, 'delete').mockRejectedValue(error);

    await expect(deleteWorkout.execute(workoutId)).rejects.toThrowError(
      `Failed to delete workout: ${error.message}`
    );
  });
});