import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import { FavoriteMovieList } from '../models/FavoriteMovieListModal';
import * as movieListService from '../services/movieListService';

export const createFavoriteMovieList: RequestHandler<
  { userId: Types.ObjectId },
  any,
  { movies: FavoriteMovieList['movies'] }
> = async (req, res, next) => {
  try {
    console.log({ movies: req.body, userId: req.params.userId });

    const list = await movieListService.createFavoriteMovieList({
      userId: req.params.userId,
      ...req.body,
    });

    res.json(list);
  } catch (error) {
    next(error);
  }
};
