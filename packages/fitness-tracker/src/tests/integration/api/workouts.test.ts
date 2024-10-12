import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';
import { PrismaService } from '../../../../src/infrastructure/database/prisma/prisma.service';
import { Workout } from '../../../../src/domain/workouts/entities/Workout';
import { CreateWorkout } from '../../../../src/domain/workouts/usecases/CreateWorkout';
import { WorkoutRepository } from '../../../../src/domain/workouts/repositories/WorkoutRepository';
import { AuthService } from '../../../../src/infrastructure/authentication/services/AuthService';
import { PrismaClient } from '@prisma/client';
import { AuthenticationModule } from '../../../../src/infrastructure/authentication/authentication.module';
import { WorkoutsModule } from '../../../../src/infrastructure/api/workouts/workouts.module';
import { WorkoutsService } from '../../../../src/infrastructure/api/workouts/workouts.service';

describe('WorkoutsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthenticationModule, WorkoutsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('should create a new workout', async () => {
    const newWorkout: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    const response = await request(app.getHttpServer())
      .post('/workouts')
      .send(newWorkout);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        type: 'Running',
      }),
    );
  });

  it('should find a workout by ID', async () => {
    const workout: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const createdWorkout = await prisma.workout.create({
      data: workout,
    });

    const response = await request(app.getHttpServer())
      .get(`/workouts/${createdWorkout.id}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdWorkout)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        type: 'Running',
      }),
    );
  });

  it('should return 404 if workout not found', async () => {
    const response = await request(app.getHttpServer())
      .get('/workouts/nonexistent-id')
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Workout not found',
    });
  });

  it('should find all workouts', async () => {
    const workout1: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const workout2: Workout = {
      type: 'Weightlifting',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 400,
      date: new Date('2023-12-21'),
      userId: 'user123',
    };
    await prisma.workout.createMany({
      data: [workout1, workout2],
    });

    const response = await request(app.getHttpServer())
      .get('/workouts')
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should update a workout', async () => {
    const workout: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const createdWorkout = await prisma.workout.create({
      data: workout,
    });

    const updatedWorkoutData: Workout = {
      ...workout,
      type: 'Weightlifting',
    };

    const response = await request(app.getHttpServer())
      .put(`/workouts/${createdWorkout.id}`)
      .send(updatedWorkoutData)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdWorkout)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        type: 'Weightlifting',
      }),
    );
  });

  it('should return 404 if workout not found for update', async () => {
    const response = await request(app.getHttpServer())
      .put('/workouts/nonexistent-id')
      .send({ type: 'Weightlifting' })
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'Workout not found',
    });
  });

  it('should delete a workout', async () => {
    const workout: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };
    const createdWorkout = await prisma.workout.create({
      data: workout,
    });

    const response = await request(app.getHttpServer())
      .delete(`/workouts/${createdWorkout.id}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdWorkout)}`);

    expect(response.status).toBe(204);

    const foundWorkout = await prisma.workout.findUnique({
      where: { id: createdWorkout.id },
    });
    expect(foundWorkout).toBeNull();
  });

  it('should handle errors during workout creation', async () => {
    const newWorkout: Workout = {
      type: 'Running',
      duration: 30,
      intensity: 'Moderate',
      caloriesBurned: 300,
      date: new Date('2023-12-20'),
      userId: 'user123',
    };

    jest.spyOn(new WorkoutsService(prisma), 'create').mockRejectedValue(new Error('Failed to create workout'));

    const response = await request(app.getHttpServer())
      .post('/workouts')
      .send(newWorkout);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during workout retrieval', async () => {
    const workoutId = 'test-workout-id';
    jest.spyOn(new WorkoutsService(prisma), 'findById').mockRejectedValue(new Error('Failed to find workout'));

    const response = await request(app.getHttpServer())
      .get(`/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during workout update', async () => {
    const workoutId = 'test-workout-id';
    const updatedWorkoutData: Workout = {
      type: 'Weightlifting',
      duration: 45,
      intensity: 'High',
      caloriesBurned: 400,
      date: new Date('2023-12-21'),
      userId: 'user123',
    };
    jest.spyOn(new WorkoutsService(prisma), 'update').mockRejectedValue(new Error('Failed to update workout'));

    const response = await request(app.getHttpServer())
      .put(`/workouts/${workoutId}`)
      .send(updatedWorkoutData)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during workout deletion', async () => {
    const workoutId = 'test-workout-id';
    jest.spyOn(new WorkoutsService(prisma), 'delete').mockRejectedValue(new Error('Failed to delete workout'));

    const response = await request(app.getHttpServer())
      .delete(`/workouts/${workoutId}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });
});