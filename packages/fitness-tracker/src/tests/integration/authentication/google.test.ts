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
import { GoogleProvider } from 'next-auth/providers/google';
import { NextApiRequest } from 'next';
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';

describe('Google Authentication Strategy', () => {
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

  it('should successfully authenticate with Google', async () => {
    const mockGoogleProfile = {
      id: 'google-user-id',
      email: 'test@google.com',
      name: 'Test User',
      // ... other Google profile data
    };

    const mockGoogleToken = {
      accessToken: 'google-access-token',
      // ... other Google token data
    };

    jest
      .spyOn(GoogleProvider, 'profile')
      .mockResolvedValue(mockGoogleProfile);

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(GoogleProvider.profile).toHaveBeenCalledWith(
      mockGoogleToken,
      // ... other profile options
    );

    expect(session?.user.id).toBe(mockGoogleProfile.id);
    expect(session?.user.email).toBe(mockGoogleProfile.email);
    expect(session?.user.name).toBe(mockGoogleProfile.name);
  });

  it('should create a new user if the user doesn\'t exist', async () => {
    const mockGoogleProfile = {
      id: 'google-user-id',
      email: 'test@google.com',
      name: 'Test User',
      // ... other Google profile data
    };

    const mockGoogleToken = {
      accessToken: 'google-access-token',
      // ... other Google token data
    };

    jest
      .spyOn(GoogleProvider, 'profile')
      .mockResolvedValue(mockGoogleProfile);

    const userExists = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(userExists).toBeNull(); // Ensure the user doesn't exist in the database

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(session?.user.id).toBe(mockGoogleProfile.id);
    expect(session?.user.email).toBe(mockGoogleProfile.email);
    expect(session?.user.name).toBe(mockGoogleProfile.name);

    // Check if the user was created in the database
    const newUser = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(newUser?.id).toBe('google-user-id');
    expect(newUser?.email).toBe('test@google.com');
    expect(newUser?.name).toBe('Test User');
  });

  it('should hash the user\'s password if the user is created', async () => {
    const mockGoogleProfile = {
      id: 'google-user-id',
      email: 'test@google.com',
      name: 'Test User',
      // ... other Google profile data
    };

    const mockGoogleToken = {
      accessToken: 'google-access-token',
      // ... other Google token data
    };

    jest
      .spyOn(GoogleProvider, 'profile')
      .mockResolvedValue(mockGoogleProfile);

    const userExists = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(userExists).toBeNull(); // Ensure the user doesn't exist in the database

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    // Check if the user's password was hashed
    const newUser = await prisma.user.findUnique({
      where: {
        email: mockGoogleProfile.email,
      },
    });

    expect(newUser?.password).not.toBe('testPassword123'); // Assert that the password is not stored in plain text

    const isPasswordHashed = await bcrypt.compare(
      'testPassword123', // Compare the original password
      newUser?.password ?? '' // ... with the stored password
    );

    expect(isPasswordHashed).toBe(true); // Confirm that the stored password is hashed
  });

  it('should handle errors during Google authentication', async () => {
    const mockGoogleError = new Error('Google authentication failed');

    jest
      .spyOn(GoogleProvider, 'profile')
      .mockRejectedValue(mockGoogleError);

    const session = await NextAuth.session({
      req: {
        headers: {
          cookie: `next-auth.session-token=google-session-token`,
        },
      } as NextApiRequest,
      // ... other session options
    });

    expect(session).toBeNull(); // Ensure the session is null in case of an error
  });
});