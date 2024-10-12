import { GoalRepository } from '../../../../../src/domain/goals/repositories/GoalRepository';
import { Goal } from '../../../../../src/domain/goals/entities/Goal';
import { PrismaClient } from '@prisma/client';

describe('GoalRepository', () => {
  let goalRepository: GoalRepository;
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    goalRepository = new GoalRepository(prisma);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should successfully create a new goal', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const createdGoal = await goalRepository.create(goalData);

    expect(createdGoal).toBeDefined();
    expect(createdGoal.id).toBeDefined();
    expect(createdGoal.title).toBe(goalData.title);
    expect(createdGoal.description).toBe(goalData.description);
    expect(createdGoal.target).toBe(goalData.target);
    expect(createdGoal.deadline).toEqual(goalData.deadline);
    expect(createdGoal.userId).toBe(goalData.userId);
  });

  it('should successfully find a goal by ID', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const createdGoal = await goalRepository.create(goalData);

    const foundGoal = await goalRepository.findById(createdGoal.id);

    expect(foundGoal).toBeDefined();
    expect(foundGoal?.id).toBe(createdGoal.id);
    expect(foundGoal?.title).toBe(goalData.title);
    expect(foundGoal?.description).toBe(goalData.description);
    expect(foundGoal?.target).toBe(goalData.target);
    expect(foundGoal?.deadline).toEqual(goalData.deadline);
    expect(foundGoal?.userId).toBe(goalData.userId);
  });

  it('should successfully find all goals by user ID', async () => {
    const goalData1: Goal = {
      title: 'Test Goal 1',
      description: 'Test Goal Description 1',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const goalData2: Goal = {
      title: 'Test Goal 2',
      description: 'Test Goal Description 2',
      target: 15,
      deadline: new Date('2025-01-01'),
      userId: 'user123',
    };

    await goalRepository.create(goalData1);
    await goalRepository.create(goalData2);

    const goals = await goalRepository.findAllByUserId('user123');

    expect(goals).toBeDefined();
    expect(goals.length).toBe(2);
    expect(goals.some((goal) => goal.id === goalData1.id)).toBe(true);
    expect(goals.some((goal) => goal.id === goalData2.id)).toBe(true);
  });

  it('should successfully update a goal', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const createdGoal = await goalRepository.create(goalData);

    const updatedGoalData: Partial<Goal> = {
      title: 'Updated Test Goal',
      target: 15,
    };

    const updatedGoal = await goalRepository.update(createdGoal.id, updatedGoalData);

    expect(updatedGoal).toBeDefined();
    expect(updatedGoal.id).toBe(createdGoal.id);
    expect(updatedGoal.title).toBe(updatedGoalData.title);
    expect(updatedGoal.target).toBe(updatedGoalData.target);
    expect(updatedGoal.description).toBe(goalData.description); // Description should remain unchanged
    expect(updatedGoal.deadline).toEqual(goalData.deadline); // Deadline should remain unchanged
    expect(updatedGoal.userId).toBe(goalData.userId); // User ID should remain unchanged
  });

  it('should successfully delete a goal', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const createdGoal = await goalRepository.create(goalData);

    await goalRepository.delete(createdGoal.id);

    const foundGoal = await goalRepository.findById(createdGoal.id);

    expect(foundGoal).toBeNull();
  });

  it('should throw an error if goal creation fails', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    jest.spyOn(prisma.goal, 'create').mockRejectedValue(new Error('Failed to create goal'));

    await expect(goalRepository.create(goalData)).rejects.toThrowError(
      'Failed to create goal: Failed to create goal'
    );
  });

  it('should throw an error if goal finding by ID fails', async () => {
    const goalId = 'test-goal-id';

    jest.spyOn(prisma.goal, 'findUnique').mockRejectedValue(new Error('Failed to find goal'));

    await expect(goalRepository.findById(goalId)).rejects.toThrowError('Failed to find goal');
  });

  it('should throw an error if finding all goals by user ID fails', async () => {
    jest.spyOn(prisma.goal, 'findMany').mockRejectedValue(new Error('Failed to find goals'));

    await expect(goalRepository.findAllByUserId('user123')).rejects.toThrowError('Failed to find goals');
  });

  it('should throw an error if goal update fails', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Test Goal',
      target: 15,
    };

    jest.spyOn(prisma.goal, 'update').mockRejectedValue(new Error('Failed to update goal'));

    await expect(goalRepository.update(goalId, goalData)).rejects.toThrowError(
      'Failed to update goal: Failed to update goal'
    );
  });

  it('should throw an error if goal deletion fails', async () => {
    const goalId = 'test-goal-id';

    jest.spyOn(prisma.goal, 'delete').mockRejectedValue(new Error('Failed to delete goal'));

    await expect(goalRepository.delete(goalId)).rejects.toThrowError('Failed to delete goal');
  });
});