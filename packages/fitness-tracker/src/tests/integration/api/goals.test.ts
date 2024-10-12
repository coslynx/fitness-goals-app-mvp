import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';
import { PrismaService } from '../../../../src/infrastructure/database/prisma/prisma.service';
import { Goal } from '../../../../src/domain/goals/entities/Goal';
import { CreateGoal } from '../../../../src/domain/goals/usecases/CreateGoal';
import { GoalRepository } from '../../../../src/domain/goals/repositories/GoalRepository';
import { AuthService } from '../../../../src/infrastructure/authentication/services/AuthService';
import { PrismaClient } from '@prisma/client';
import { AuthenticationModule } from '../../../../src/infrastructure/authentication/authentication.module';
import { GoalsModule } from '../../../../src/infrastructure/api/goals/goals.module';
import { GoalsService } from '../../../../src/infrastructure/api/goals/goals.service';

describe('GoalsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthenticationModule, GoalsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('should create a new goal', async () => {
    const newGoal: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const response = await request(app.getHttpServer())
      .post('/goals')
      .send(newGoal);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Test Goal',
      }),
    );
  });

  it('should find a goal by ID', async () => {
    const goal: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const createdGoal = await prisma.goal.create({
      data: goal,
    });

    const response = await request(app.getHttpServer())
      .get(`/goals/${createdGoal.id}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdGoal)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Test Goal',
      }),
    );
  });

  it('should return 404 if goal not found', async () => {
    const response = await request(app.getHttpServer())
      .get('/goals/nonexistent-id')
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Goal not found',
    });
  });

  it('should find all goals', async () => {
    const goal1: Goal = {
      title: 'Test Goal 1',
      description: 'Test Goal Description 1',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const goal2: Goal = {
      title: 'Test Goal 2',
      description: 'Test Goal Description 2',
      target: 15,
      deadline: new Date('2025-01-01'),
      userId: 'user123',
    };
    await prisma.goal.createMany({
      data: [goal1, goal2],
    });

    const response = await request(app.getHttpServer())
      .get('/goals')
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should update a goal', async () => {
    const goal: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const createdGoal = await prisma.goal.create({
      data: goal,
    });

    const updatedGoalData: Goal = {
      ...goal,
      title: 'Updated Test Goal',
    };

    const response = await request(app.getHttpServer())
      .put(`/goals/${createdGoal.id}`)
      .send(updatedGoalData)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdGoal)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Updated Test Goal',
      }),
    );
  });

  it('should return 404 if goal not found for update', async () => {
    const response = await request(app.getHttpServer())
      .put('/goals/nonexistent-id')
      .send({ title: 'Updated Test Goal' })
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Goal not found',
    });
  });

  it('should delete a goal', async () => {
    const goal: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const createdGoal = await prisma.goal.create({
      data: goal,
    });

    const response = await request(app.getHttpServer())
      .delete(`/goals/${createdGoal.id}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdGoal)}`);

    expect(response.status).toBe(204);

    const foundGoal = await prisma.goal.findUnique({
      where: { id: createdGoal.id },
    });
    expect(foundGoal).toBeNull();
  });

  it('should handle errors during goal creation', async () => {
    const newGoal: Goal = {
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    jest.spyOn(new GoalsService(prisma), 'create').mockRejectedValue(new Error('Failed to create goal'));

    const response = await request(app.getHttpServer())
      .post('/goals')
      .send(newGoal);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during goal retrieval', async () => {
    const goalId = 'test-goal-id';
    jest.spyOn(new GoalsService(prisma), 'findById').mockRejectedValue(new Error('Failed to find goal'));

    const response = await request(app.getHttpServer())
      .get(`/goals/${goalId}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during goal update', async () => {
    const goalId = 'test-goal-id';
    const updatedGoalData: Goal = {
      title: 'Updated Test Goal',
      description: 'Updated Test Goal Description',
      target: 15,
      deadline: new Date('2025-01-01'),
      userId: 'user123',
    };
    jest.spyOn(new GoalsService(prisma), 'update').mockRejectedValue(new Error('Failed to update goal'));

    const response = await request(app.getHttpServer())
      .put(`/goals/${goalId}`)
      .send(updatedGoalData)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during goal deletion', async () => {
    const goalId = 'test-goal-id';
    jest.spyOn(new GoalsService(prisma), 'delete').mockRejectedValue(new Error('Failed to delete goal'));

    const response = await request(app.getHttpServer())
      .delete(`/goals/${goalId}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });
});