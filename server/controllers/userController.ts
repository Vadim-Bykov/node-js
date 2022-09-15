import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { validationResult } from 'express-validator';
import { ApiError } from '../errors/ApiError';
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validation error', errors.array()));
    }

    const picture = req.files?.picture;

    const user = await userService.registration({
      ...req.body,
      picture: picture as UploadedFile,
    });

    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export interface LoginBody {
  email: string;
  password: string;
}

export const login: RequestHandler<any, any, LoginBody, any> = async (
  req,
  res,
  next
) => {
  try {
    const user = await userService.login(req.body);

    res.cookie('refreshToken', user.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// const userRole = await RoleModel.create({ role: 'USER' });
// const adminRole = await RoleModel.create({ role: 'ADMIN' });
