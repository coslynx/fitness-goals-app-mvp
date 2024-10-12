import { GoalController } from '../../../../../src/infrastructure/api/controllers/GoalController';
import { GoalService } from '../../../../../src/infrastructure/api/services/GoalService';
import { Goal } from '../../../../../src/domain/goals/entities/Goal';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('GoalController', () => {
  let goalController: GoalController;
  let goalService: GoalService;

  beforeEach(() => {
    goalService = new GoalService(prisma);
    goalController = new GoalController(goalService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should create a new goal', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const req: Partial<Request> = {
      body: goalData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(goalData));
  });

  it('should find a goal by ID', async () => {
    const goalId = 'test-goal-id';
    const goal: Goal = {
      id: goalId,
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    jest.spyOn(goalService, 'findById').mockResolvedValue(goal);

    const req: Partial<Request> = {
      params: { id: goalId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(goal);
  });

  it('should return 404 if goal not found', async () => {
    const goalId = 'test-goal-id';
    jest.spyOn(goalService, 'findById').mockResolvedValue(null);

    const req: Partial<Request> = {
      params: { id: goalId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: `Goal with ID ${goalId} not found.` });
  });

  it('should find all goals', async () => {
    const goals: Goal[] = [
      {
        id: 'goal1-id',
        title: 'Test Goal 1',
        description: 'Test Goal Description 1',
        target: 10,
        deadline: new Date('2024-12-31'),
        userId: 'user123',
      },
      {
        id: 'goal2-id',
        title: 'Test Goal 2',
        description: 'Test Goal Description 2',
        target: 15,
        deadline: new Date('2025-01-01'),
        userId: 'user123',
      },
    ];
    jest.spyOn(goalService, 'findAll').mockResolvedValue(goals);

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(goals);
  });

  it('should update a goal', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Goal Title',
    };
    const goal: Goal = {
      id: goalId,
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    jest.spyOn(goalService, 'findById').mockResolvedValue(goal);
    jest.spyOn(goalService, 'update').mockResolvedValue(goal);

    const req: Partial<Request> = {
      params: { id: goalId },
      body: goalData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(goal);
  });

  it('should return 404 if goal not found for update', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Goal Title',
    };
    jest.spyOn(goalService, 'findById').mockResolvedValue(null);

    const req: Partial<Request> = {
      params: { id: goalId },
      body: goalData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: `Goal with ID ${goalId} not found.` });
  });

  it('should delete a goal', async () => {
    const goalId = 'test-goal-id';
    jest.spyOn(goalService, 'delete').mockResolvedValue(undefined);

    const req: Partial<Request> = {
      params: { id: goalId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await goalController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should handle errors during goal creation', async () => {
    const goalData: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const error = new Error('Failed to create goal');
    jest.spyOn(goalService, 'create').mockRejectedValue(error);

    const req: Partial<Request> = {
      body: goalData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during goal retrieval', async () => {
    const goalId = 'test-goal-id';
    const error = new Error('Failed to find goal');
    jest.spyOn(goalService, 'findById').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: goalId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during goal update', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Goal Title',
    };
    const error = new Error('Failed to update goal');
    jest.spyOn(goalService, 'update').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: goalId },
      body: goalData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during goal deletion', async () => {
    const goalId = 'test-goal-id';
    const error = new Error('Failed to delete goal');
    jest.spyOn(goalService, 'delete').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: goalId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await goalController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});