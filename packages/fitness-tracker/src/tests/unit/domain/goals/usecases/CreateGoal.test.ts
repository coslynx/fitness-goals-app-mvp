import { CreateGoal } from '../../../../../src/domain/goals/usecases/CreateGoal';
import { GoalRepository } from '../../../../../src/domain/goals/repositories/GoalRepository';
import { Goal } from '../../../../../src/domain/goals/entities/Goal';

describe('CreateGoal', () => {
  let createGoal: CreateGoal;
  let goalRepository: GoalRepository;

  beforeEach(() => {
    goalRepository = new GoalRepository();
    createGoal = new CreateGoal(goalRepository);
  });

  it('should successfully create a new goal', async () => {
    const goalData: Goal = {
      id: 'test-goal-id',
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    jest.spyOn(goalRepository, 'create').mockResolvedValue(goalData);

    const createdGoal = await createGoal.execute(goalData);

    expect(goalRepository.create).toHaveBeenCalledWith(goalData);
    expect(createdGoal).toEqual(goalData);
  });

  it('should throw an error if goal creation fails', async () => {
    const goalData: Goal = {
      id: 'test-goal-id',
      title: 'Test Goal',
      description: 'Test Goal Description',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };
    const error = new Error('Failed to create goal');
    jest.spyOn(goalRepository, 'create').mockRejectedValue(error);

    await expect(createGoal.execute(goalData)).rejects.toThrowError(
      `Failed to create goal: ${error.message}`
    );
  });
});