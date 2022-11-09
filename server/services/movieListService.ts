import { Types } from 'mongoose';
import { ApiError } from '../errors/ApiError';
import {
  FavoriteMovieList,
  FavoriteMovieListModel,
} from '../models/FavoriteMovieListModal';
import * as tokenService from './tokenService';

export const createFavoriteMovieList = async ({
  userId,
  movies,
  title,
}: {
  userId: string;
  movies: FavoriteMovieList['movies'];
  title: FavoriteMovieList['title'];
}) => {
  // const userId = tokenService.getUserIdFromToken()
  try {
    // const listCandidate = await FavoriteMovieListModel.find({ userId });
    // if (listCandidate) {
    //   throw ApiError.badRequest('');
    // }

    const list = await FavoriteMovieListModel.create({
      userId,
      movies,
      title,
    });

    return list;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};
