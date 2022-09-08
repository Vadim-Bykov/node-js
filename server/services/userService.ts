import bcrypt from 'bcrypt';
import { UploadedFile } from 'express-fileupload';
import { RegistrationBody } from '../controllers/userController';
import { getUserDto } from '../dtos/userDto';
import { ApiError } from '../errors/ApiError';
import { UserModal } from '../models/UserModel';
import { saveFile } from './fileService';
import * as tokenService from './tokenService';

interface IRegistrationParams extends RegistrationBody {
  picture?: UploadedFile;
}

export const registration = async ({
  email,
  password,
  picture,
  roles,
}: IRegistrationParams) => {
  const candidate = await UserModal.findOne({ email });
  if (candidate) {
    throw ApiError.badRequest(`User with email: ${email} exists`);
  }

  const hashPassword = await bcrypt.hash(password, 3);
  const fileName = saveFile(picture);

  // const userRole = RoleModel.find({role: roles?[0]})

  const user = await UserModal.create({
    email,
    password: hashPassword,
    roles,
    picture: fileName,
  });

  const userDto = getUserDto(user);

  const { refreshToken, accessToken } = tokenService.generateToken(userDto);
  await tokenService.saveRefreshToken(userDto.id, refreshToken);

  return { user: userDto, refreshToken, accessToken };
};
