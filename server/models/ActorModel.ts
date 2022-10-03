import { model, Schema, Types } from 'mongoose';
import { MovieData } from './MovieModel';

export interface ActorData {
  _id?: Types.ObjectId;
  firstName: string;
  lastName?: string;
  age?: number;
  films?: MovieData['name'][];
  photo?: string;
}

const Actor = new Schema<ActorData>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number },
  photo: { type: String },
  films: { type: [String], ref: 'Movie' },
});

export const ActorModel = model('Actor', Actor);
