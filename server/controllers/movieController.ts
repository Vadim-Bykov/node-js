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
