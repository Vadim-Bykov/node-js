import { ApiError } from './../errors/ApiError';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { IUserDto } from '../dtos/userDto';
import { TokenModel } from '../models/TokenModel';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateToken = (payload: IUserDto) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: '5h',
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (
  userId: Types.ObjectId,
  refreshToken: string
) => {
  const tokenData = await findRefreshTokenByUserId(userId);
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  await TokenModel.create({ userId, refreshToken });
};

export const findRefreshTokenByUserId = async (userId: Types.ObjectId) => {
  const tokenData = await TokenModel.findOne({ userId });
  return tokenData;
};

export const validateRefreshToken = (refreshToken: string) => {
  try {
    const userData = jwt.verify(refreshToken, JWT_REFRESH_SECRET as string);

    return userData as IUserDto;
  } catch (error) {
    return null;
  }
};

export const validateAccessToken = (accessToken: string) => {
  try {
    const userData = jwt.verify(accessToken, JWT_ACCESS_SECRET as string);

    return userData as IUserDto;
  } catch (error) {
    return null;
  }
};

export const removeRefreshToken = async (refreshToken: string) => {
  try {
    const tokenData = await TokenModel.findOneAndDelete({ refreshToken });

    if (!tokenData) {
      return { warning: `This user was logged out earlier` };
    }

    return tokenData;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const findRefreshToken = async (refreshToken: string) => {
  try {
    const tokenData = await TokenModel.findOne({ refreshToken });

    return tokenData;
  } catch (error: any) {
    throw ApiError.badRequest(error?.message);
  }
};

export const getUserIdFromToken = (accessToken: string) => {
  try {
    const userId = jwt.decode(accessToken);
    console.log({ userId });

    return userId;
  } catch (error) {
    return null;
  }
};
