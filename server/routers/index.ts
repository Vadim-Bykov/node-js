import { Router } from 'express';
import { actorRouter } from './actorRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/user', userRouter);
router.use('/actor', actorRouter);
