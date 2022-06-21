import { UploadedFile } from 'express-fileupload';
import { RegistrationBody } from '../controllers/userController';
import { ApiError } from '../errors/ApiError';
import { UserModal } from '../models/UserModel';

interface IRegistrationParams extends RegistrationBody {
  picture?: UploadedFile | UploadedFile[];
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

  const user = await UserModal.create({ email, password, roles });

  return user;
};
