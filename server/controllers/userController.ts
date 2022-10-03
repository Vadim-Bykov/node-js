import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { validationResult } from 'express-validator';
import { ApiError } from '../errors/ApiError';
import { RoleType } from '../models/RoleModel';
import * as userService from '../services/userService';

const REFRESH_TOKEN_COOKIE = 'refreshToken';

export interface RegistrationBody {
  email: string;
  password: string;
  name?: string;
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

    res.cookie(REFRESH_TOKEN_COOKIE, user.refreshToken, {
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

    res.cookie(REFRESH_TOKEN_COOKIE, user.refreshToken, {
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

export const getUserByID: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserByID(id);

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const activateAccount: RequestHandler<{ link: string }> = async (
  req,
  res,
  next
) => {
  try {
    const clientUrl: string = process.env.CLIENT_URL_1!;
    try {
      const { link } = req.params;
      await userService.activateAccount(link);

      res.redirect(clientUrl);
    } catch (error) {}
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const removedToken = await userService.logout(refreshToken);

    res.clearCookie(REFRESH_TOKEN_COOKIE);
    res.json(removedToken);
  } catch (error) {
    next(error);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken);

    res.cookie(REFRESH_TOKEN_COOKIE, userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json(userData);
  } catch (error) {}
};

// const userRole = await RoleModel.create({ role: 'USER' });
// const adminRole = await RoleModel.create({ role: 'ADMIN' });

export interface UpdateBody {
  email: string;
  password: string;
  newPassword?: string;
  name: string;
}

export const update: RequestHandler<
  any,
  any,
  UpdateBody,
  { id: string }
> = async (req, res, next) => {
  try {
    const { id } = req.query;
    const userData = await userService.update({ ...req.body, id });

    res.json(userData);
  } catch (error) {
    next(error);
  }
};
