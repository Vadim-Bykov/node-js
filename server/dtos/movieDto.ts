import { MovieData } from '../models/MovieModel';

export const getMovieDto = ({
  _id,
  actors,
  name,
  description,
  poster,
  rate,
}: MovieData) => {
  return { id: _id, actors, name, description, poster, rate };
};
