import { DeleteUser } from '../../../../../src/domain/users/usecases/DeleteUser';
import { UserRepository } from '../../../../../src/domain/users/repositories/UserRepository';

describe('DeleteUser', () => {
  let deleteUser: DeleteUser;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    deleteUser = new DeleteUser(userRepository);
  });

  it('should successfully delete a user', async () => {
    const userId = 'test-user-id';
    jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);

    await deleteUser.execute(userId);

    expect(userRepository.delete).toHaveBeenCalledWith(userId);
  });

  it('should throw an error if user deletion fails', async () => {
    const userId = 'test-user-id';
    const error = new Error('Failed to delete user');
    jest.spyOn(userRepository, 'delete').mockRejectedValue(error);

    await expect(deleteUser.execute(userId)).rejects.toThrowError(
      `Failed to delete user: ${error.message}`
    );
  });
});