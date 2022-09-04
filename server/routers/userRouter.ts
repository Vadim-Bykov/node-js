import { Router } from 'express';
import * as userController from '../controllers/userController';
import { email, password } from '../validators/userValidator';

export const userRouter = Router();

userRouter.post(
  '/registration',
  [email, password],
  userController.registration
);
