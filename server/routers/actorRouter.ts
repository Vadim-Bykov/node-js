import { Router } from 'express';
import * as actorController from '../controllers/actorController';

export const actorRouter = Router();

actorRouter.post('/add', actorController.add);
