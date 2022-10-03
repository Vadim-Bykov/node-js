import { model, Schema } from 'mongoose';

enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type RoleType = keyof typeof Roles;
interface IRole {
  role: RoleType;
}

const Role = new Schema<IRole>({
  role: { type: String, default: 'USER' },
});

export const RoleModel = model('Role', Role);
