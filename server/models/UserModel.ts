import { model, Schema, Types } from 'mongoose';
import { RoleType } from './RoleModel';

export interface IUserData {
  email: string;
  password: string;
  name?: string;
  isActivated: boolean;
  activationLink: string;
  picture?: string;
  roles?: RoleType[];
  _id: Types.ObjectId;
}

const User = new Schema<IUserData>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  picture: { type: String },
  roles: { type: [String], ref: 'Role' },
});

export const UserModal = model('User', User);
