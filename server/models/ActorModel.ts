import { model, Schema, Types } from 'mongoose';

export interface Actor {
  _id?: Types.ObjectId;
  firstName: string;
  lastName?: string;
  age?: number;
  films?: string[];
}

const Actor = new Schema<Actor>({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number },
  films: { type: [String], ref: 'Movie' },
});

export const ActorModel = model('Actor', Actor);
