import jwb from 'jsonwebtoken';
import { Types } from 'mongoose';
import { IUserDto } from '../dtos/userDto';
import { TokenModel } from '../models/TokenModel';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const generateToken = (payload: IUserDto) => {
  const accessToken = jwb.sign(payload, JWT_ACCESS_SECRET as string, {
    expiresIn: '5h',
  });
  const refreshToken = jwb.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};

export const saveRefreshToken = async (
  userId: Types.ObjectId,
  refreshToken: string
) => {
  //   const tokenData = await TokenModel.findOne({ userId });
  const tokenData = await findRefreshToken(userId);
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  await TokenModel.create({ userId, refreshToken });
};

export const findRefreshToken = async (userId: Types.ObjectId) => {
  const tokenData = await TokenModel.findOne({ userId });
  return tokenData;
};
