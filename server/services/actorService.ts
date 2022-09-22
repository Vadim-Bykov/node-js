import { ApiError } from '../errors/ApiError';
import { ActorModel, ActorData } from '../models/ActorModel';

export const add = async ({
  firstName,
  lastName,
  age,
  films,
  photo,
}: ActorData) => {
  try {
    const candidate = await ActorModel.findOne({ firstName, lastName, age });

    if (candidate) {
      throw ApiError.badRequest(
        'This actor has already been added to the base'
      );
    }

    const actor = await ActorModel.create({ firstName, lastName, age, films });

    return actor;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};
