import { Router } from 'express';
import * as actorController from '../controllers/actorController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { firstName } from '../validators/actorValidator';

export const actorRouter = Router();

actorRouter.post(
  '/add',
  [firstName],
  authMiddleware(['ADMIN']),
  actorController.add
);
