import { Router } from 'express';
import { GoalController } from '../controllers/GoalController';
import { authMiddleware } from '../middleware/auth';

const goalsRouter = Router();
const goalController = new GoalController();

// Create a new goal (POST /goals)
goalsRouter.post('/', authMiddleware, goalController.create);

// Get a goal by ID (GET /goals/:id)
goalsRouter.get('/:id', authMiddleware, goalController.findById);

// Get all goals for the current user (GET /goals)
goalsRouter.get('/', authMiddleware, goalController.findAll);

// Update a goal by ID (PUT /goals/:id)
goalsRouter.put('/:id', authMiddleware, goalController.update);

// Delete a goal by ID (DELETE /goals/:id)
goalsRouter.delete('/:id', authMiddleware, goalController.delete);

export default goalsRouter;