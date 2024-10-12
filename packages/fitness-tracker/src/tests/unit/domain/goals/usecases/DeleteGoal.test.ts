import { DeleteGoal } from '../../../../../src/domain/goals/usecases/DeleteGoal';
import { GoalRepository } from '../../../../../src/domain/goals/repositories/GoalRepository';

describe('DeleteGoal', () => {
  let deleteGoal: DeleteGoal;
  let goalRepository: GoalRepository;

  beforeEach(() => {
    goalRepository = new GoalRepository();
    deleteGoal = new DeleteGoal(goalRepository);
  });

  it('should successfully delete a goal', async () => {
    const goalId = 'test-goal-id';
    jest.spyOn(goalRepository, 'delete').mockResolvedValue(undefined);

    await deleteGoal.execute(goalId);

    expect(goalRepository.delete).toHaveBeenCalledWith(goalId);
  });

  it('should throw an error if goal deletion fails', async () => {
    const goalId = 'test-goal-id';
    const error = new Error('Failed to delete goal');
    jest.spyOn(goalRepository, 'delete').mockRejectedValue(error);

    await expect(deleteGoal.execute(goalId)).rejects.toThrowError(
      `Failed to delete goal: ${error.message}`
    );
  });
});