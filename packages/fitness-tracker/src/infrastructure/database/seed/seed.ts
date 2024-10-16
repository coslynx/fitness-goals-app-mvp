import { PrismaClient } from '@prisma/client';
import { Goal } from '../../domain/goals/entities/Goal';
import { Workout } from '../../domain/workouts/entities/Workout';
import { User } from '../../domain/users/entities/User';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.user.createMany({
      data: [
        {
          email: 'user1@example.com',
          password: 'password123',
        },
        {
          email: 'user2@example.com',
          password: 'password456',
        },
      ],
    });
    await prisma.goal.createMany({
      data: [
        {
          title: 'Lose 10 pounds',
          description: 'Reach a weight loss goal',
          target: 10,
          deadline: new Date('2024-12-31'),
          userId: 'user1@example.com',
        },
        {
          title: 'Gain muscle mass',
          description: 'Increase muscle mass',
          target: 5,
          deadline: new Date('2024-12-31'),
          userId: 'user2@example.com',
        },
      ],
    });
    await prisma.workout.createMany({
      data: [
        {
          type: 'Running',
          duration: 30,
          intensity: 'Moderate',
          caloriesBurned: 300,
          date: new Date('2023-12-20'),
          userId: 'user1@example.com',
        },
        {
          type: 'Weightlifting',
          duration: 45,
          intensity: 'High',
          caloriesBurned: 400,
          date: new Date('2023-12-21'),
          userId: 'user2@example.com',
        },
      ],
    });
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();