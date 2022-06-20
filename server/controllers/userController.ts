import { RequestHandler } from 'express';
import { RoleType } from '../models/RoleModel';
import * as userService from '../services/userService';

export interface RegistrationBody {
  email: string;
  password: string;
  roles?: RoleType[];
}

export const registration: RequestHandler<
  any,
  any,
  RegistrationBody,
  any
> = async (req, res, next) => {
  try {
    const { email, password, roles } = req.body;
    const picture = req.files?.picture;

    const user = await userService.registration({ ...req.body, picture });

    console.log({ user });

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// const userRole = await RoleModel.create({ role: 'USER' });
// const adminRole = await RoleModel.create({ role: 'ADMIN' });
