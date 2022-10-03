import { body } from 'express-validator';

export const firstName = body(
  'firstName',
  'First name is required (3 symbols as minimum)'
)
  .trim()
  .isLength({ min: 3, max: 20 });

export const films = body(
  'films',
  'This is must be an array of movie names'
).isArray();
