import { Router } from 'express';
import { WorkoutController } from '../controllers/WorkoutController';
import { authMiddleware } from '../middleware/auth';

const workoutsRouter = Router();
const workoutController = new WorkoutController();

// Create a new workout (POST /workouts)
workoutsRouter.post('/', authMiddleware, workoutController.create);

// Get a workout by ID (GET /workouts/:id)
workoutsRouter.get('/:id', authMiddleware, workoutController.findById);

// Get all workouts for the current user (GET /workouts)
workoutsRouter.get('/', authMiddleware, workoutController.findAll);

// Update a workout by ID (PUT /workouts/:id)
workoutsRouter.put('/:id', authMiddleware, workoutController.update);

// Delete a workout by ID (DELETE /workouts/:id)
workoutsRouter.delete('/:id', authMiddleware, workoutController.delete);

export default workoutsRouter;