import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { MovieData } from '../models/MovieModel';
import * as movieService from '../services/movieService';

export const add: RequestHandler<any, any, MovieData> = async (
  req,
  res,
  next
) => {
  try {
    const picture = req.files?.picture;
    const movie = await movieService.addMovie({
      ...req.body,
      picture: picture as UploadedFile,
    });

    res.json(movie);
  } catch (error) {
    next(error);
  }
};
export const getMovieByID: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const movie = await movieService.getMovieByID(id);

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

export const getAllMovies: RequestHandler = async (req, res, next) => {
  try {
    const movies = await movieService.getAllMovies();

    res.json(movies);
  } catch (error) {
    next(error);
  }
};

export const getMoviesByActorID: RequestHandler<
  any,
  any,
  any,
  { actorId: string }
> = async (req, res, next) => {
  try {
    const movies = await movieService.getMoviesByActorID(req.query?.actorId);

    res.json(movies);
  } catch (error) {
    next(error);
  }
};
