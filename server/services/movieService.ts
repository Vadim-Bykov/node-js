import { MovieModel } from '../models/MovieModel';
import { ApiError } from '../errors/ApiError';
import { Types } from 'mongoose';

export const addActorToMovies = async (
  actorName: string,
  actorId: Types.ObjectId,
  films?: string[]
) => {
  if (!films?.length) return;

  try {
    const movies = Promise.all(
      films.map(async (movieName) => {
        const candidate = await MovieModel.findOne({ name: movieName });
        if (candidate) {
          candidate.actors = [...candidate.actors, actorName];
          await candidate.save();
          //  const addedMovie = await MovieModel.updateOne({
          //    actors: [...candidate.actors, actorName],
          //  });
        }
      })
    );

    return movies;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};
