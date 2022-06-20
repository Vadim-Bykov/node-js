import { RequestHandler } from 'express';
import { RoleModel, RoleType } from '../models/RoleModel';

interface RegistrationBody {
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
    console.log({ email, password, roles });

    res.json({});
  } catch (error) {
    next(error);
  }
};

// const userRole = await RoleModel.create({ role: 'USER' });
// const adminRole = await RoleModel.create({ role: 'ADMIN' });
