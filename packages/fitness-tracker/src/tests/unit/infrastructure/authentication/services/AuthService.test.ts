import { describe, expect, it, vi } from 'vitest';
import AuthService from '../../../../../src/infrastructure/authentication/services/AuthService';
import { User } from '../../../../../src/domain/users/entities/User';
import { UserRepository } from '../../../../../src/domain/users/repositories/UserRepository';
import bcrypt from 'bcryptjs';

vi.mock('../../../../../src/domain/users/repositories/UserRepository');

describe('AuthService', () => {
  let authService: AuthService;
  let userRepositoryMock: UserRepository;

  beforeEach(() => {
    userRepositoryMock = new UserRepository();
    authService = new AuthService(userRepositoryMock);
  });

  it('should successfully register a new user', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;

    vi.spyOn(userRepositoryMock, 'create').mockResolvedValue(userData);

    const registeredUser = await authService.register(userData);

    expect(userRepositoryMock.create).toHaveBeenCalledWith(userData);
    expect(registeredUser).toEqual(userData);
  });

  it('should throw an error if user registration fails', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const error = new Error('Failed to create user');
    vi.spyOn(userRepositoryMock, 'create').mockRejectedValue(error);

    await expect(authService.register(userData)).rejects.toThrowError(
      `Failed to register user: ${error.message}`
    );
  });

  it('should successfully authenticate a user with correct credentials', async () => {
    const email = 'test@example.com';
    const password = 'testPassword123';
    const user: User = {
      id: 'test-user-id',
      email,
      password: await bcrypt.hash(password, 10),
    };
    vi.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(user);

    const authenticatedUser = await authService.login(email, password);

    expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(email);
    expect(authenticatedUser).toEqual(user);
  });

  it('should throw an error if user is not found', async () => {
    const email = 'test@example.com';
    const password = 'testPassword123';
    vi.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(null);

    await expect(authService.login(email, password)).rejects.toThrowError(
      'User not found.'
    );
  });

  it('should throw an error if incorrect password is provided', async () => {
    const email = 'test@example.com';
    const password = 'wrongPassword';
    const user: User = {
      id: 'test-user-id',
      email,
      password: await bcrypt.hash('testPassword123', 10),
    };
    vi.spyOn(userRepositoryMock, 'findByEmail').mockResolvedValue(user);

    await expect(authService.login(email, password)).rejects.toThrowError(
      'Incorrect password.'
    );
  });

  it('should successfully generate a JWT token for a user', async () => {
    const user: User = {
      id: 'test-user-id',
      email: 'test@example.com',
      password: 'testPassword123',
    };
    vi.spyOn(NextAuth.jwt, 'default').mockResolvedValue('jwt-token');

    const token = await authService.generateToken(user);

    expect(NextAuth.jwt.default).toHaveBeenCalledWith({
      user: { id: user.id, email: user.email },
    });
    expect(token).toBe('jwt-token');
  });

  it('should throw an error if JWT token generation fails', async () => {
    const user: User = {
      id: 'test-user-id',
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const error = new Error('Failed to generate token');
    vi.spyOn(NextAuth.jwt, 'default').mockRejectedValue(error);

    await expect(authService.generateToken(user)).rejects.toThrowError(
      `Failed to generate token: ${error.message}`
    );
  });
});