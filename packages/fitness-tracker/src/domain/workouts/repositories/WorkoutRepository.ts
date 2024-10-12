import { PrismaClient } from '@prisma/client';
import { Workout } from '../../entities/Workout';

const prisma = new PrismaClient();

export class WorkoutRepository {
  async create(workoutData: Workout): Promise<Workout> {
    const newWorkout = await prisma.workout.create({
      data: {
        type: workoutData.type,
        duration: workoutData.duration,
        intensity: workoutData.intensity,
        caloriesBurned: workoutData.caloriesBurned,
        date: workoutData.date,
        userId: workoutData.userId,
      },
    });

    return newWorkout;
  }

  async findById(workoutId: string): Promise<Workout | null> {
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
    });

    return workout;
  }

  async findAllByUserId(userId: string): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
    });

    return workouts;
  }

  async update(workoutId: string, workoutData: Workout): Promise<Workout> {
    const updatedWorkout = await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        type: workoutData.type,
        duration: workoutData.duration,
        intensity: workoutData.intensity,
        caloriesBurned: workoutData.caloriesBurned,
        date: workoutData.date,
      },
    });

    return updatedWorkout;
  }

  async delete(workoutId: string): Promise<void> {
    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });
  }
}