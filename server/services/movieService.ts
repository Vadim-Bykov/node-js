import { MovieData, MovieModel } from '../models/MovieModel';
import { ApiError } from '../errors/ApiError';
import { Types } from 'mongoose';
import { UploadedFile } from 'express-fileupload';
import { saveFile } from './fileService';
import { getMovieDto } from '../dtos/movieDto';

interface AddMovieData extends MovieData {
  picture?: UploadedFile;
}

export const addMovie = async ({
  name,
  picture,
  description,
  rate,
  actors,
}: AddMovieData) => {
  try {
    const candidate = await MovieModel.findOne({ name });
    if (candidate) {
      throw ApiError.badRequest(
        'This movie has already been added to the base'
      );
    }

    const fileName = saveFile(picture, 'posters');
    const movie = await MovieModel.create({
      actors,
      name,
      description,
      poster: fileName,
      rate,
    });

    const movieDto = getMovieDto(movie);

    return movieDto;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const addActorToMovies = async (
  actorName: string,
  actorId: Types.ObjectId,
  films?: string[]
) => {
  if (!films?.length) return;

  const addedMovies: { [key: string]: Omit<MovieData, '_id'> } = {};

  try {
    await Promise.all(
      films.map(async (movieName) => {
        const movie = await MovieModel.findOne({ name: movieName });

        if (!movie) return;

        const isAddedBefore = movie.actors?.some(
          (actor) => actor.actorId === actorId
        );

        if (isAddedBefore) {
          const movieDto = getMovieDto(movie);

          return movieDto;
        } else {
          movie.actors = [...movie.actors, { name: actorName, actorId }];
          await movie.save();

          const movieDto = getMovieDto(movie);

          addedMovies[movie.name] = movieDto;
        }
      })
    );

    return addedMovies;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getMovieByID = async (id: string) => {
  try {
    const movie = await MovieModel.findById(id);
    if (!movie) {
      throw ApiError.badRequest('Movie with this ID does not exist');
    }

    const movieDto = getMovieDto(movie);

    return movieDto;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getAllMovies = async () => {
  try {
    const movies = await MovieModel.find();

    return movies;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};
