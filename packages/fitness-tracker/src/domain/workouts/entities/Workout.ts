import { v4 as uuidv4 } from 'uuid';

export interface WorkoutProps {
  id?: string;
  type: string;
  duration: number;
  intensity: string;
  caloriesBurned: number;
  date: Date;
  userId: string;
}

export class Workout {
  id: string;
  type: string;
  duration: number;
  intensity: string;
  caloriesBurned: number;
  date: Date;
  userId: string;

  constructor(props: WorkoutProps) {
    this.id = props.id ?? uuidv4();
    this.type = props.type;
    this.duration = props.duration;
    this.intensity = props.intensity;
    this.caloriesBurned = props.caloriesBurned;
    this.date = props.date;
    this.userId = props.userId;
  }

  update(props: Partial<WorkoutProps>): void {
    this.type = props.type ?? this.type;
    this.duration = props.duration ?? this.duration;
    this.intensity = props.intensity ?? this.intensity;
    this.caloriesBurned = props.caloriesBurned ?? this.caloriesBurned;
    this.date = props.date ?? this.date;
  }
}