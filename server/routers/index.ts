import { Router } from 'express';
import { actorRouter } from './actorRouter';
import { favoriteMovieListRouter } from './movieListRouter';
import { movieRouter } from './movieRouter';
import { userRouter } from './userRouter';

export const router = Router();

router.use('/user', userRouter);
router.use('/actor', actorRouter);
router.use('/movie', movieRouter);
router.use('/favorite-list', favoriteMovieListRouter);
