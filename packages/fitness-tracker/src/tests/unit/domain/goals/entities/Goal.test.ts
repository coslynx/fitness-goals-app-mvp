import { Goal } from '../../entities/Goal';

describe('Goal', () => {
  it('should create a new goal with valid properties', () => {
    const goalData = {
      title: 'Lose 10 pounds',
      description: 'Reach a weight loss goal',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const goal = new Goal(goalData);

    expect(goal.id).toBeDefined();
    expect(goal.title).toBe(goalData.title);
    expect(goal.description).toBe(goalData.description);
    expect(goal.target).toBe(goalData.target);
    expect(goal.deadline).toEqual(goalData.deadline);
    expect(goal.userId).toBe(goalData.userId);
  });

  it('should update goal properties', () => {
    const goalData = {
      title: 'Lose 10 pounds',
      description: 'Reach a weight loss goal',
      target: 10,
      deadline: new Date('2024-12-31'),
      userId: 'user123',
    };

    const goal = new Goal(goalData);

    const updatedGoalData = {
      title: 'Gain muscle mass',
      target: 5,
      deadline: new Date('2025-01-01'),
    };

    goal.update(updatedGoalData);

    expect(goal.title).toBe(updatedGoalData.title);
    expect(goal.target).toBe(updatedGoalData.target);
    expect(goal.deadline).toEqual(updatedGoalData.deadline);
    expect(goal.description).toBe(goalData.description); // Description should remain unchanged
    expect(goal.userId).toBe(goalData.userId); // User ID should remain unchanged
  });
});