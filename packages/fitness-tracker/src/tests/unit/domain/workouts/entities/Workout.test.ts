import { Workout } from '../../../../../src/domain/workouts/entities/Workout';

describe('Workout', () => {
  it('should create a new workout with valid properties', () => {
    const workoutData: Workout = {
      id: 'test-workout-id',
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const workout = new Workout(workoutData);

    expect(workout.id).toBeDefined();
    expect(workout.type).toBe(workoutData.type);
    expect(workout.duration).toBe(workoutData.duration);
    expect(workout.intensity).toBe(workoutData.intensity);
    expect(workout.caloriesBurned).toBe(workoutData.caloriesBurned);
    expect(workout.date).toEqual(workoutData.date);
    expect(workout.userId).toBe(workoutData.userId);
  });

  it('should update workout properties', () => {
    const workoutData: Workout = {
      id: 'test-workout-id',
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const workout = new Workout(workoutData);

    const updatedWorkoutData: Partial<Workout> = {
      type: 'Weightlifting',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 400,
      date: new Date('2023-12-21'),
    };

    workout.update(updatedWorkoutData);

    expect(workout.type).toBe(updatedWorkoutData.type);
    expect(workout.duration).toBe(updatedWorkoutData.duration);
    expect(workout.intensity).toBe(updatedWorkoutData.intensity);
    expect(workout.caloriesBurned).toBe(updatedWorkoutData.caloriesBurned);
    expect(workout.date).toEqual(updatedWorkoutData.date);
    expect(workout.userId).toBe(workoutData.userId); // userId should remain unchanged
  });
});