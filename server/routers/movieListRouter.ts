import { authMiddleware } from './../middlewares/authMiddleware';
import { Router } from 'express';
import * as movieListController from '../controllers/movieListController';

export const favoriteMovieListRouter = Router();

favoriteMovieListRouter.post(
  '/add/:userId',
  authMiddleware(['ADMIN', 'USER']),
  movieListController.createFavoriteMovieList
);
