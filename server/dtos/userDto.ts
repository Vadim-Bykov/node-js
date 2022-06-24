import { RoleType } from './../models/RoleModel';
import { Types } from 'mongoose';
import { IUserData } from '../models/UserModel';

export interface IUserDto {
  id: Types.ObjectId;
  email: string;
  isActivated: boolean;
  picture?: string;
  roles?: RoleType[];
}

export const getUserDto = ({
  _id,
  email,
  isActivated,
  picture,
  roles = ['USER'],
}: IUserData) => {
  return {
    id: _id,
    email,
    isActivated,
    picture,
    roles,
  };
};
