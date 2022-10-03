import { UploadedFile } from 'express-fileupload';
import { getActorDto } from '../dtos/actorDto';
import { ApiError } from '../errors/ApiError';
import { ActorModel, ActorData } from '../models/ActorModel';
import { saveFile } from './fileService';
import * as movieService from './movieService';

interface AddParams extends ActorData {
  picture?: UploadedFile;
}

export const add = async ({
  firstName,
  lastName,
  age,
  films,
  picture,
}: AddParams) => {
  try {
    const candidate = await ActorModel.findOne({ firstName, lastName, age });

    if (candidate) {
      throw ApiError.badRequest(
        'This actor has already been added to the base'
      );
    }

    const fileName = saveFile(picture, 'actors');
    const actor = await ActorModel.create({
      firstName,
      lastName,
      age,
      photo: fileName,
    });

    const movies = await movieService.addActorToMovies(
      firstName,
      actor._id,
      films
    );

    const addedFilms = films?.filter((film) => movies?.[film]);

    actor.films = addedFilms;

    const actorWithFilms = await actor.save();

    const actorDto = getActorDto(actorWithFilms);

    return { ...actorDto, movies };
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getActorByID = async (id: string) => {
  try {
    const actor = await ActorModel.findById(id);
    if (!actor) {
      throw ApiError.badRequest('Actor with this ID does not exist');
    }

    const actorDto = getActorDto(actor);

    return actorDto;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getAllActors = async () => {
  try {
    const actors = await ActorModel.find();

    return actors;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};
