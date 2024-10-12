import { Request, Response } from 'express';
import { GoalService } from '../services/GoalService';

export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  async create(req: Request, res: Response) {
    try {
      const goalData = req.body;
      const createdGoal = await this.goalService.create(goalData);
      res.status(201).json(createdGoal);
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
      const goalId = req.params.id;
      const goal = await this.goalService.findById(goalId);
      if (!goal) {
        res.status(404).json({ error: `Goal with ID ${goalId} not found.` });
      } else {
        res.status(200).json(goal);
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
      const goals = await this.goalService.findAll();
      res.status(200).json(goals);
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
      const goalId = req.params.id;
      const goalData = req.body;
      const updatedGoal = await this.goalService.update(goalId, goalData);
      if (!updatedGoal) {
        res.status(404).json({ error: `Goal with ID ${goalId} not found.` });
      } else {
        res.status(200).json(updatedGoal);
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
      const goalId = req.params.id;
      await this.goalService.delete(goalId);
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