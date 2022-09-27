import { model, Schema, Types } from 'mongoose';

interface Actor {
  name: string;
  actorId: Types.ObjectId;
}
export interface MovieData {
  _id: Types.ObjectId;
  name: string;
  poster?: string;
  rate?: number;
  description: string;
  actors: Actor[];
}

const Movie = new Schema<MovieData>({
  name: { type: String, required: true, unique: true },
  poster: { type: String },
  rate: { type: Number, default: 0 },
  description: { type: String, required: true },
  actors: {
    type: [{ name: String, actorId: Types.ObjectId }],
    required: true,
    ref: 'Actor',
  },
});

export const MovieModel = model('Movie', Movie);
