import { v4 } from 'uuid';
import bcrypt from 'bcrypt';
import { UploadedFile } from 'express-fileupload';
import {
  LoginBody,
  RegistrationBody,
  UpdateBody,
} from '../controllers/userController';
import { getUserDto } from '../dtos/userDto';
import { ApiError } from '../errors/ApiError';
import { IUserData, UserModal } from '../models/UserModel';
import { saveFile } from './fileService';
import * as mailService from './mailServise';
import { findRoles } from './roleService';
import * as tokenService from './tokenService';

interface IRegistrationParams extends RegistrationBody {
  picture?: UploadedFile;
}

export const registration = async ({
  email,
  password,
  picture,
  roles,
  name,
}: IRegistrationParams) => {
  try {
    const candidate = await UserModal.findOne({ email });
    if (candidate) {
      throw ApiError.badRequest(`User with email: ${email} exists`);
    }

    const activationLink = v4();
    const hashPassword = await bcrypt.hash(password, 3);
    const fileName = saveFile(picture);

    const validRoles = await findRoles(roles);

    const user = await UserModal.create({
      email,
      password: hashPassword,
      roles: validRoles,
      picture: fileName,
      activationLink,
      name,
    });

    const userDto = getUserDto(user);

    const { refreshToken, accessToken } = tokenService.generateToken(userDto);
    await tokenService.saveRefreshToken(userDto.id, refreshToken);
    // await mailService.sendActivationMail(email, activationLink);

    return { user: userDto, refreshToken, accessToken };
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const login = async ({ email, password }: LoginBody) => {
  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      throw ApiError.badRequest(`User with email ${email} does mot exists`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw ApiError.badRequest('Password is invalid');
    }

    const userDto = getUserDto(user);
    const { accessToken, refreshToken } = tokenService.generateToken(userDto);
    await tokenService.saveRefreshToken(userDto.id, refreshToken);

    return { user: userDto, refreshToken, accessToken };
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModal.find();
    return users;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getUserByID = async (id: string) => {
  try {
    const user = await UserModal.findById(id);
    if (!user) {
      throw ApiError.badRequest('User with this ID does not exist');
    }

    const userDto = getUserDto(user);

    return userDto;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const activateAccount = async (link: string) => {
  try {
    const user = await UserModal.findOne({ activationLink: link });
    if (!user) {
      throw ApiError.badRequest('Link is incorrect');
    }

    user.isActivated = true;
    await user.save();
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const logout = async (refreshToken: string) => {
  try {
    const tokenData = await tokenService.removeRefreshToken(refreshToken);

    return tokenData;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.unauthorized();
  }

  try {
    const tokenData = tokenService.validateRefreshToken(refreshToken);
    const tokenDataFromDb = await tokenService.findRefreshToken(refreshToken);
    if (!tokenData || !tokenDataFromDb) {
      throw ApiError.unauthorized();
    }

    const user = await UserModal.findById(tokenData.id);
    if (!user) {
      throw ApiError.badRequest(`User with ID: ${tokenData.id} was not found`);
    }

    const userDto = getUserDto(user);
    const tokens = tokenService.generateToken(userDto);
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

interface IUpdate extends UpdateBody {
  id: string;
}

export const update = async (data: IUpdate) => {
  const dataToUpdate: { [key: string]: string } = {};
  const keys = Object.keys(data);
  const values = Object.values(data);
  keys.forEach((key, index) => {
    if (values[index]) {
      dataToUpdate[key] = values[index];
    }
  });

  try {
    const exUserData = await UserModal.findById(data.id);
    if (!exUserData) {
      throw ApiError.badRequest('User with this ID does not exist');
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      exUserData?.password
    );

    if (!isValidPassword) {
      throw ApiError.badRequest('Password is invalid');
    }

    const password = dataToUpdate.newPassword
      ? dataToUpdate.newPassword
      : dataToUpdate.password;

    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModal.findOneAndUpdate(
      { _id: data.id },
      { ...dataToUpdate, password: hashPassword },
      { new: true }
    );

    const userDto = getUserDto(user as IUserData);
    const { accessToken, refreshToken } = tokenService.generateToken(userDto);
    await tokenService.saveRefreshToken(userDto.id, refreshToken);

    return { user: userDto, accessToken, refreshToken };
  } catch (error: any) {
    throw ApiError.badRequest(
      `${error?.message}. Probably user's ID is incorrect`
    );
  }
};
