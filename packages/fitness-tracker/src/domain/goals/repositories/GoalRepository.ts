import { PrismaClient } from '@prisma/client';
import { Goal } from '../../entities/Goal';

const prisma = new PrismaClient();

export class GoalRepository {
  async create(goalData: Goal): Promise<Goal> {
    const newGoal = await prisma.goal.create({
      data: {
        title: goalData.title,
        description: goalData.description,
        target: goalData.target,
        deadline: goalData.deadline,
        userId: goalData.userId,
      },
    });

    return newGoal;
  }

  async findById(goalId: string): Promise<Goal | null> {
    const goal = await prisma.goal.findUnique({
      where: {
        id: goalId,
      },
    });

    return goal;
  }

  async findAllByUserId(userId: string): Promise<Goal[]> {
    const goals = await prisma.goal.findMany({
      where: {
        userId,
      },
    });

    return goals;
  }

  async update(goalId: string, goalData: Goal): Promise<Goal> {
    const updatedGoal = await prisma.goal.update({
      where: {
        id: goalId,
      },
      data: {
        title: goalData.title,
        description: goalData.description,
        target: goalData.target,
        deadline: goalData.deadline,
      },
    });

    return updatedGoal;
  }

  async delete(goalId: string): Promise<void> {
    await prisma.goal.delete({
      where: {
        id: goalId,
      },
    });
  }
}