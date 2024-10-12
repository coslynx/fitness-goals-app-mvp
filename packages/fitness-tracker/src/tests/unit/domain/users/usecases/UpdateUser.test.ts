import { UpdateUser } from '../../../../../src/domain/users/usecases/UpdateUser';
import { UserRepository } from '../../../../../src/domain/users/repositories/UserRepository';
import { User } from '../../../../../src/domain/users/entities/User';

describe('UpdateUser', () => {
  let updateUser: UpdateUser;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    updateUser = new UpdateUser(userRepository);
  });

  it('should successfully update a user', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };
    const existingUser: User = {
      id: userId,
      email: 'original@example.com',
      password: 'testPassword123',
    };
    jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser);
    jest.spyOn(userRepository, 'update').mockResolvedValue(existingUser);

    const updatedUser = await updateUser.execute(userId, userData);

    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(userRepository.update).toHaveBeenCalledWith(userId, existingUser);
    expect(updatedUser.email).toBe(userData.email);
  });

  it('should throw an error if the user is not found', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };
    jest.spyOn(userRepository, 'findById').mockResolvedValue(null);

    await expect(updateUser.execute(userId, userData)).rejects.toThrowError(
      `User with ID ${userId} not found.`
    );
  });

  it('should throw an error if user update fails', async () => {
    const userId = 'test-user-id';
    const userData: Partial<User> = {
      email: 'updated@example.com',
    };
    const existingUser: User = {
      id: userId,
      email: 'original@example.com',
      password: 'testPassword123',
    };
    const error = new Error('Failed to update user');
    jest.spyOn(userRepository, 'findById').mockResolvedValue(existingUser);
    jest.spyOn(userRepository, 'update').mockRejectedValue(error);

    await expect(updateUser.execute(userId, userData)).rejects.toThrowError(
      `Failed to update user: ${error.message}`
    );
  });
});