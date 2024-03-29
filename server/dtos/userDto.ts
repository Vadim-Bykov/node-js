import { RoleType } from './../models/RoleModel';
import { Types } from 'mongoose';
import { IUserData } from '../models/UserModel';

export interface IUserDto {
  id: Types.ObjectId;
  email: string;
  isActivated: boolean;
  picture?: string;
  roles?: RoleType[];
  name?: string;
}

type GetUserDto = (userData: IUserData) => IUserDto;

export const getUserDto: GetUserDto = ({
  _id,
  email,
  isActivated,
  picture,
  roles = ['USER'],
  name,
}) => {
  return {
    id: _id,
    email,
    isActivated,
    picture,
    roles,
    name,
  };
};
