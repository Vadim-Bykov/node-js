import { ApiError } from '../errors/ApiError';
import { RoleModel, RoleType } from '../models/RoleModel';

type Fn = (roles?: RoleType[]) => Promise<RoleType[]>;

export const findRoles: Fn = async (roles) => {
  if (!roles) return ['USER'];

  const validRoles = await Promise.all(
    roles.map(async (role) => {
      const validRole = await RoleModel.findOne({ role });
      if (validRole) {
        return validRole?.role;
      } else {
        throw ApiError.badRequest(`Role "${role}" does't exist`);
      }
    })
  );

  return validRoles;
};
