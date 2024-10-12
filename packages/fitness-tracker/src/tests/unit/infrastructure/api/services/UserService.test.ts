import { UserService } from '../../../../../src/infrastructure/api/services/UserService';
import { User } from '../../../../../src/domain/users/entities/User';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(prisma);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should successfully create a new user', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const createdUser = await userService.create(userData);

    expect(createdUser).toBeDefined();
    expect(createdUser.id).toBeDefined();
    expect(createdUser.email).toBe(userData.email);
    // Password should be hashed and not directly accessible
    expect(createdUser.password).not.toBe(userData.password);
  });

  it('should successfully find a user by ID', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const createdUser = await userService.create(userData);

    const foundUser = await userService.findById(createdUser.id);

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(createdUser.id);
    expect(foundUser?.email).toBe(userData.email);
    // Password should be hashed and not directly accessible
    expect(foundUser?.password).not.toBe(userData.password);
  });

  it('should successfully find all users', async () => {
    const userData1: User = {
      email: 'user1@example.com',
      password: 'password123',
    };
    const userData2: User = {
      email: 'user2@example.com',
      password: 'password456',
    };

    await userService.create(userData1);
    await userService.create(userData2);

    const users = await userService.findAll();

    expect(users).toBeDefined();
    expect(users.length).toBe(2);
    expect(users.some((user) => user.id === userData1.id)).toBe(true);
    expect(users.some((user) => user.id === userData2.id)).toBe(true);
  });

  it('should successfully update a user', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const createdUser = await userService.create(userData);

    const updatedUserData: Partial<User> = {
      email: 'updated@example.com',
    };

    const updatedUser = await userService.update(createdUser.id, updatedUserData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.id).toBe(createdUser.id);
    expect(updatedUser.email).toBe(updatedUserData.email);
    // Password should remain unchanged unless explicitly updated
    expect(updatedUser.password).not.toBe(updatedUserData.password);
  });

  it('should successfully delete a user', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    const createdUser = await userService.create(userData);

    await userService.delete(createdUser.id);

    const foundUser = await userService.findById(createdUser.id);

    expect(foundUser).toBeNull();
  });

  it('should throw an error if user creation fails', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };

    jest.spyOn(prisma.user, 'create').mockRejectedValue(new Error('Failed to create user'));

    await expect(userService.create(userData)).rejects.toThrowError(
      'Failed to create user: Failed to create user'
    );
  });

  it('should throw an error if user finding by ID fails', async () => {
    const userId = 'test-user-id';

    jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Failed to find user'));

    await expect(userService.findById(userId)).rejects.toThrowError('Failed to find user');
  });

  it('should throw an error if finding all users fails', async () => {
    jest.spyOn(prisma.user, 'findMany').mockRejectedValue(new Error('Failed to find users'));

    await expect(userService.findAll()).rejects.toThrowError('Failed to find users');
  });

  it('should throw an error if user update fails', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };

    jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('Failed to update user'));

    await expect(userService.update(userId, userData)).rejects.toThrowError(
      'Failed to update user: Failed to update user'
    );
  });

  it('should throw an error if user deletion fails', async () => {
    const userId = 'test-user-id';

    jest.spyOn(prisma.user, 'delete').mockRejectedValue(new Error('Failed to delete user'));

    await expect(userService.delete(userId)).rejects.toThrowError('Failed to delete user');
  });
});