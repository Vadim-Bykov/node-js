import { Router } from 'express';
import * as movieListController from '../controllers/movieListController';

export const favoriteMovieListRouter = Router();

favoriteMovieListRouter.post(
  '/add/:userId',
  movieListController.createFavoriteMovieList
);
