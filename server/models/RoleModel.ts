import { model, Schema } from 'mongoose';

export type RoleType = 'USER' | 'ADMIN';
interface IRole {
  role: RoleType;
}

const Role = new Schema<IRole>({
  role: { type: String, default: 'USER' },
});

export const RoleModel = model('Role', Role);
