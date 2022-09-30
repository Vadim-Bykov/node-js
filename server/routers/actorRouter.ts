import { Router } from 'express';
import * as actorController from '../controllers/actorController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { films, firstName } from '../validators/actorValidator';

export const actorRouter = Router();

actorRouter.post(
  '/add',
  [firstName, films],
  authMiddleware(['ADMIN']),
  actorController.add
);
actorRouter.get(
  '/info/:id',
  authMiddleware(['ADMIN', 'USER']),
  actorController.getActorByID
);
actorRouter.get('/', actorController.getAllActors);
