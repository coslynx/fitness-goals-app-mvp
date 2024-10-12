import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middleware/auth';

const usersRouter = Router();
const userController = new UserController();

// Create a new user (POST /users)
usersRouter.post('/', userController.create);

// Get a user by ID (GET /users/:id)
usersRouter.get('/:id', authMiddleware, userController.findById);

// Get all users (GET /users)
usersRouter.get('/', authMiddleware, userController.findAll);

// Update a user by ID (PUT /users/:id)
usersRouter.put('/:id', authMiddleware, userController.update);

// Delete a user by ID (DELETE /users/:id)
usersRouter.delete('/:id', authMiddleware, userController.delete);

export default usersRouter;