import { v4 as uuidv4 } from 'uuid';

export interface GoalProps {
  id?: string;
  title: string;
  description: string;
  target: number;
  deadline: Date;
  userId: string;
}

export class Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  deadline: Date;
  userId: string;

  constructor(props: GoalProps) {
    this.id = props.id ?? uuidv4();
    this.title = props.title;
    this.description = props.description;
    this.target = props.target;
    this.deadline = props.deadline;
    this.userId = props.userId;
  }

  update(props: Partial<GoalProps>): void {
    this.title = props.title ?? this.title;
    this.description = props.description ?? this.description;
    this.target = props.target ?? this.target;
    this.deadline = props.deadline ?? this.deadline;
  }
}