import { v4 as uuidv4 } from 'uuid';
import { Goal } from '../goals/entities/Goal';
import { Workout } from '../workouts/entities/Workout';

export interface UserProps {
  id?: string;
  email: string;
  password?: string;
  goals?: Goal[];
  workouts?: Workout[];
}

export class User {
  id: string;
  email: string;
  password?: string;
  goals: Goal[] = [];
  workouts: Workout[] = [];

  constructor(props: UserProps) {
    this.id = props.id ?? uuidv4();
    this.email = props.email;
    this.password = props.password;
    this.goals = props.goals ?? [];
    this.workouts = props.workouts ?? [];
  }

  addGoal(goal: Goal): void {
    this.goals.push(goal);
  }

  removeGoal(goalId: string): void {
    this.goals = this.goals.filter((goal) => goal.id !== goalId);
  }

  addWorkout(workout: Workout): void {
    this.workouts.push(workout);
  }

  removeWorkout(workoutId: string): void {
    this.workouts = this.workouts.filter((workout) => workout.id !== workoutId);
  }
}