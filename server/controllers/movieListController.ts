import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { FavoriteMovieList } from '../models/FavoriteMovieListModal';
import * as movieListService from '../services/movieListService';

export const createFavoriteMovieList: RequestHandler<
  { userId: string },
  any,
  { movies: FavoriteMovieList['movies']; title: FavoriteMovieList['title'] }
> = async (req, res, next) => {
  try {
    const list = await movieListService.createFavoriteMovieList({
      userId: req.params.userId,
      ...req.body,
    });

    res.json(list);
  } catch (error) {
    next(error);
  }
};
