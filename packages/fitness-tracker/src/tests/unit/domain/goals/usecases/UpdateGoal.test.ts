import { UpdateGoal } from '../../../../../src/domain/goals/usecases/UpdateGoal';
import { GoalRepository } from '../../../../../src/domain/goals/repositories/GoalRepository';
import { Goal } from '../../../../../src/domain/goals/entities/Goal';

describe('UpdateGoal', () => {
  let updateGoal: UpdateGoal;
  let goalRepository: GoalRepository;

  beforeEach(() => {
    goalRepository = new GoalRepository();
    updateGoal = new UpdateGoal(goalRepository);
  });

  it('should successfully update a goal', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Goal Title',
      target: 15,
    };
    const existingGoal: Goal = {
      id: goalId,
      title: 'Original Goal Title',
      description: 'Original Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    jest.spyOn(goalRepository, 'findById').mockResolvedValue(existingGoal);
    jest.spyOn(goalRepository, 'update').mockResolvedValue(existingGoal);

    const updatedGoal = await updateGoal.execute(goalId, goalData);

    expect(goalRepository.findById).toHaveBeenCalledWith(goalId);
    expect(goalRepository.update).toHaveBeenCalledWith(goalId, existingGoal);
    expect(updatedGoal.title).toBe(goalData.title);
    expect(updatedGoal.target).toBe(goalData.target);
  });

  it('should throw an error if the goal is not found', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Goal Title',
      target: 15,
    };
    jest.spyOn(goalRepository, 'findById').mockResolvedValue(null);

    await expect(updateGoal.execute(goalId, goalData)).rejects.toThrowError(
      `Goal with ID ${goalId} not found.`
    );
  });

  it('should throw an error if goal update fails', async () => {
    const goalId = 'test-goal-id';
    const goalData: Partial<Goal> = {
      title: 'Updated Goal Title',
      target: 15,
    };
    const existingGoal: Goal = {
      id: goalId,
      title: 'Original Goal Title',
      description: 'Original Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const error = new Error('Failed to update goal');
    jest.spyOn(goalRepository, 'findById').mockResolvedValue(existingGoal);
    jest.spyOn(goalRepository, 'update').mockRejectedValue(error);

    await expect(updateGoal.execute(goalId, goalData)).rejects.toThrowError(
      `Failed to update goal: ${error.message}`
    );
  });
});