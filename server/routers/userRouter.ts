import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { email, password } from '../validators/userValidator';

export const userRouter = Router();

userRouter.post(
  '/registration',
  [email, password],
  userController.registration
);

userRouter.post('/login', userController.login);

userRouter.get('/', authMiddleware(['USER']), userController.getAllUsers);
