import { CreateUser } from '../../../../../src/domain/users/usecases/CreateUser';
import { UserRepository } from '../../../../../src/domain/users/repositories/UserRepository';
import { User } from '../../../../../src/domain/users/entities/User';
import bcrypt from 'bcryptjs';

describe('CreateUser', () => {
  let createUser: CreateUser;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    createUser = new CreateUser(userRepository);
  });

  it('should successfully create a new user', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hashedPassword;

    jest.spyOn(userRepository, 'create').mockResolvedValue(userData);

    const createdUser = await createUser.execute(userData);

    expect(userRepository.create).toHaveBeenCalledWith(userData);
    expect(createdUser).toEqual(userData);
  });

  it('should throw an error if user creation fails', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'testPassword123',
    };
    const error = new Error('Failed to create user');
    jest.spyOn(userRepository, 'create').mockRejectedValue(error);

    await expect(createUser.execute(userData)).rejects.toThrowError(
      `Failed to create user: ${error.message}`
    );
  });
});