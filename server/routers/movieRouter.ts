import { Router } from 'express';
import * as movieController from '../controllers/movieController';
import { authMiddleware } from '../middlewares/authMiddleware';

export const movieRouter = Router();

movieRouter.post('/add', authMiddleware(['ADMIN']), movieController.add);
movieRouter.get(
  '/info/:id',
  authMiddleware(['USER', 'ADMIN']),
  movieController.getMovieByID
);
movieRouter.get(
  '/',
  authMiddleware(['ADMIN', 'USER']),
  movieController.getAllMovies
);
