import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const userData = req.body;
      const createdUser = await this.userService.create(userData);
      res.status(201).json(createdUser);
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
      const userId = req.params.id;
      const user = await this.userService.findById(userId);
      if (!user) {
        res.status(404).json({ error: `User with ID ${userId} not found.` });
      } else {
        res.status(200).json(user);
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
      const users = await this.userService.findAll();
      res.status(200).json(users);
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
      const userId = req.params.id;
      const userData = req.body;
      const updatedUser = await this.userService.update(userId, userData);
      if (!updatedUser) {
        res.status(404).json({ error: `User with ID ${userId} not found.` });
      } else {
        res.status(200).json(updatedUser);
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
      const userId = req.params.id;
      await this.userService.delete(userId);
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