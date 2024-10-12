import { Request, Response } from 'express';
import { WorkoutService } from '../services/WorkoutService';

export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  async create(req: Request, res: Response) {
    try {
      const workoutData = req.body;
      const createdWorkout = await this.workoutService.create(workoutData);
      res.status(201).json(createdWorkout);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const workoutId = req.params.id;
      const workout = await this.workoutService.findById(workoutId);
      if (!workout) {
        res.status(404).json({ error: `Workout with ID ${workoutId} not found.` });
      } else {
        res.status(200).json(workout);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const workouts = await this.workoutService.findAll();
      res.status(200).json(workouts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const workoutId = req.params.id;
      const workoutData = req.body;
      const updatedWorkout = await this.workoutService.update(workoutId, workoutData);
      if (!updatedWorkout) {
        res.status(404).json({ error: `Workout with ID ${workoutId} not found.` });
      } else {
        res.status(200).json(updatedWorkout);
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const workoutId = req.params.id;
      await this.workoutService.delete(workoutId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}