import { Types, Schema, model } from 'mongoose';

export interface FavoriteMovieList {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  movies: Types.ObjectId[];
  title: string;
}

const List = new Schema<FavoriteMovieList>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movies: { type: [Types.ObjectId], required: true, ref: 'Movie' },
  title: { type: String, required: true },
});

export const FavoriteMovieListModel = model('FavoriteMovieList', List);
