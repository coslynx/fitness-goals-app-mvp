import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';
import { PrismaService } from '../../../../src/infrastructure/database/prisma/prisma.service';
import { User } from '../../../../src/domain/users/entities/User';
import { CreateUser } from '../../../../src/domain/users/usecases/CreateUser';
import { UserRepository } from '../../../../src/domain/users/repositories/UserRepository';
import { AuthService } from '../../../../src/infrastructure/authentication/services/AuthService';
import { PrismaClient } from '@prisma/client';
import { AuthenticationModule } from '../../../../src/infrastructure/authentication/authentication.module';
import { UsersModule } from '../../../../src/infrastructure/api/users/users.module';
import { UsersService } from '../../../../src/infrastructure/api/users/users.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthenticationModule, UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = new PrismaClient();
  });

  afterEach(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  it('should create a new user', async () => {
    const newUser: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
      }),
    );
  });

  it('should find a user by ID', async () => {
    const user: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const createdUser = await prisma.user.create({
      data: user,
    });

    const response = await request(app.getHttpServer())
      .get(`/users/${createdUser.id}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdUser)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
      }),
    );
  });

  it('should return 404 if user not found', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/nonexistent-id')
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'User not found',
    });
  });

  it('should find all users', async () => {
    const user1: User = {
      email: 'user1@example.com',
      password: 'password123',
    };
    const user2: User = {
      email: 'user2@example.com',
      password: 'password456',
    };
    await prisma.user.createMany({
      data: [user1, user2],
    });

    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should update a user', async () => {
    const user: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const createdUser = await prisma.user.create({
      data: user,
    });

    const updatedUserData: User = {
      ...user,
      email: 'updated@example.com',
    };

    const response = await request(app.getHttpServer())
      .put(`/users/${createdUser.id}`)
      .send(updatedUserData)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdUser)}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'updated@example.com',
      }),
    );
  });

  it('should return 404 if user not found for update', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/nonexistent-id')
      .send({ email: 'updated@example.com' })
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      message: 'User not found',
    });
  });

  it('should delete a user', async () => {
    const user: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const createdUser = await prisma.user.create({
      data: user,
    });

    const response = await request(app.getHttpServer())
      .delete(`/users/${createdUser.id}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken(createdUser)}`);

    expect(response.status).toBe(204);

    const foundUser = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });
    expect(foundUser).toBeNull();
  });

  it('should handle errors during user creation', async () => {
    const newUser: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    jest.spyOn(new UsersService(prisma), 'create').mockRejectedValue(new Error('Failed to create user'));

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUser);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during user retrieval', async () => {
    const userId = 'test-user-id';
    jest.spyOn(new UsersService(prisma), 'findById').mockRejectedValue(new Error('Failed to find user'));

    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during user update', async () => {
    const userId = 'test-user-id';
    const updatedUserData: User = {
      email: 'updated@example.com',
      password: 'testPassword123',
    };
    jest.spyOn(new UsersService(prisma), 'update').mockRejectedValue(new Error('Failed to update user'));

    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .send(updatedUserData)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('should handle errors during user deletion', async () => {
    const userId = 'test-user-id';
    jest.spyOn(new UsersService(prisma), 'delete').mockRejectedValue(new Error('Failed to delete user'));

    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${await new AuthService().generateToken({ id: 'user123', email: 'user123@example.com' })}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });
});