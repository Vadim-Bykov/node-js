import { ActorData } from './../models/ActorModel';
export const getActorDto = ({
  firstName,
  lastName,
  age,
  films,
  photo,
  _id,
}: ActorData) => {
  return { firstName, lastName, age, films, photo, id: _id };
};
