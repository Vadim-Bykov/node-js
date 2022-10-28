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
}: {
  userId: Types.ObjectId;
  movies: FavoriteMovieList['movies'];
}) => {
  // const userId = tokenService.getUserIdFromToken()
  try {
    const list = await FavoriteMovieListModel.create({
      userId,
      movies,
    });

    return list;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};
