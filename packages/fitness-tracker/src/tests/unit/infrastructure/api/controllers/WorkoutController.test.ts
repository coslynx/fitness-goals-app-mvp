import { WorkoutController } from '../../../../../src/infrastructure/api/controllers/WorkoutController';
import { WorkoutService } from '../../../../../src/infrastructure/api/services/WorkoutService';
import { Workout } from '../../../../../src/domain/workouts/entities/Workout';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('WorkoutController', () => {
  let workoutController: WorkoutController;
  let workoutService: WorkoutService;

  beforeEach(() => {
    workoutService = new WorkoutService(prisma);
    workoutController = new WorkoutController(workoutService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should create a new workout', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const req: Partial<Request> = {
      body: workoutData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(workoutData));
  });

  it('should find a workout by ID', async () => {
    const workoutId = 'test-workout-id';
    const workout: Workout = {
      id: workoutId,
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    jest.spyOn(workoutService, 'findById').mockResolvedValue(workout);

    const req: Partial<Request> = {
      params: { id: workoutId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(workout);
  });

  it('should return 404 if workout not found', async () => {
    const workoutId = 'test-workout-id';
    jest.spyOn(workoutService, 'findById').mockResolvedValue(null);

    const req: Partial<Request> = {
      params: { id: workoutId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: `Workout with ID ${workoutId} not found.` });
  });

  it('should find all workouts', async () => {
    const workouts: Workout[] = [
      {
        id: 'workout1-id',
        type: 'Running',
        duration: 30,
        intensity: 'Moderate',
        caloriesBurned: 300,
        date: new Date('2023-12-20'),
        userId: 'user123',
      },
      {
        id: 'workout2-id',
        type: 'Weightlifting',
        duration: 45,
        intensity: 'High',
        caloriesBurned: 400,
        date: new Date('2023-12-21'),
        userId: 'user123',
      },
    ];
    jest.spyOn(workoutService, 'findAll').mockResolvedValue(workouts);

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(workouts);
  });

  it('should update a workout', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
    };
    const workout: Workout = {
      id: workoutId,
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    jest.spyOn(workoutService, 'findById').mockResolvedValue(workout);
    jest.spyOn(workoutService, 'update').mockResolvedValue(workout);

    const req: Partial<Request> = {
      params: { id: workoutId },
      body: workoutData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(workout);
  });

  it('should return 404 if workout not found for update', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
    };
    jest.spyOn(workoutService, 'findById').mockResolvedValue(null);

    const req: Partial<Request> = {
      params: { id: workoutId },
      body: workoutData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: `Workout with ID ${workoutId} not found.` });
  });

  it('should delete a workout', async () => {
    const workoutId = 'test-workout-id';
    jest.spyOn(workoutService, 'delete').mockResolvedValue(undefined);

    const req: Partial<Request> = {
      params: { id: workoutId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await workoutController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should handle errors during workout creation', async () => {
    const workoutData: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const error = new Error('Failed to create workout');
    jest.spyOn(workoutService, 'create').mockRejectedValue(error);

    const req: Partial<Request> = {
      body: workoutData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during workout retrieval', async () => {
    const workoutId = 'test-workout-id';
    const error = new Error('Failed to find workout');
    jest.spyOn(workoutService, 'findById').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: workoutId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during workout update', async () => {
    const workoutId = 'test-workout-id';
    const workoutData: Partial<Workout> = {
      type: 'Weightlifting',
    };
    const error = new Error('Failed to update workout');
    jest.spyOn(workoutService, 'update').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: workoutId },
      body: workoutData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during workout deletion', async () => {
    const workoutId = 'test-workout-id';
    const error = new Error('Failed to delete workout');
    jest.spyOn(workoutService, 'delete').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: workoutId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await workoutController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});