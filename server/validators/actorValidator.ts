import { body } from 'express-validator';

export const firstName = body(
  'firstName',
  'First name is required (3 symbols as minimum)'
)
  .trim()
  .isLength({ min: 3, max: 20 });
