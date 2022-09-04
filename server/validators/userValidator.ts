import { IUserData } from './../models/UserModel';
import { body } from 'express-validator';

export const email = body('email', 'Email is invalid').trim().isEmail();
export const password = body(
  'password',
  "Password doesn't match the requirements"
)
  .matches(/(?=.*[a-z])(?=.*[A-Z])/)
  .isLength({ min: 6, max: 16 });
