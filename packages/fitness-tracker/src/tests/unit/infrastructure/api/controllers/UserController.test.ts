import { UserController } from '../../../../../src/infrastructure/api/controllers/UserController';
import { UserService } from '../../../../../src/infrastructure/api/services/UserService';
import { User } from '../../../../../src/domain/users/entities/User';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(prisma);
    userController = new UserController(userService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const req: Partial<Request> = {
      body: userData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(userData));
  });

  it('should find a user by ID', async () => {
    const userId = 'test-user-id';
    const user: User = {
      id: userId,
      email: 'test@example.com',
      password: 'testPassword123',
    };
    jest.spyOn(userService, 'findById').mockResolvedValue(user);

    const req: Partial<Request> = {
      params: { id: userId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('should return 404 if user not found', async () => {
    const userId = 'test-user-id';
    jest.spyOn(userService, 'findById').mockResolvedValue(null);

    const req: Partial<Request> = {
      params: { id: userId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: `User with ID ${userId} not found.` });
  });

  it('should find all users', async () => {
    const users: User[] = [
      {
        id: 'user1-id',
        email: 'user1@example.com',
        password: 'password123',
      },
      {
        id: 'user2-id',
        email: 'user2@example.com',
        password: 'password456',
      },
    ];
    jest.spyOn(userService, 'findAll').mockResolvedValue(users);

    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it('should update a user', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };
    const user: User = {
      id: userId,
      email: 'test@example.com',
      password: 'testPassword123',
    };
    jest.spyOn(userService, 'findById').mockResolvedValue(user);
    jest.spyOn(userService, 'update').mockResolvedValue(user);

    const req: Partial<Request> = {
      params: { id: userId },
      body: userData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it('should return 404 if user not found for update', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };
    jest.spyOn(userService, 'findById').mockResolvedValue(null);

    const req: Partial<Request> = {
      params: { id: userId },
      body: userData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: `User with ID ${userId} not found.` });
  });

  it('should delete a user', async () => {
    const userId = 'test-user-id';
    jest.spyOn(userService, 'delete').mockResolvedValue(undefined);

    const req: Partial<Request> = {
      params: { id: userId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it('should handle errors during user creation', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const error = new Error('Failed to create user');
    jest.spyOn(userService, 'create').mockRejectedValue(error);

    const req: Partial<Request> = {
      body: userData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during user retrieval', async () => {
    const userId = 'test-user-id';
    const error = new Error('Failed to find user');
    jest.spyOn(userService, 'findById').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: userId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.findById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during user update', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };
    const error = new Error('Failed to update user');
    jest.spyOn(userService, 'update').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: userId },
      body: userData,
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });

  it('should handle errors during user deletion', async () => {
    const userId = 'test-user-id';
    const error = new Error('Failed to delete user');
    jest.spyOn(userService, 'delete').mockRejectedValue(error);

    const req: Partial<Request> = {
      params: { id: userId },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.delete(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});