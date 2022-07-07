import * as tokenService from './../services/tokenService';
import { RequestHandler } from 'express';
import { ApiError } from '../errors/ApiError';
import { RoleType } from '../models/RoleModel';

export const authMiddleware =
  (roles: RoleType[]): RequestHandler =>
  (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const { authorization } = req.headers;
      const accessToken = authorization?.split(' ')[1];

      if (!refreshToken || !authorization || !accessToken) {
        return next(ApiError.unauthorized());
      }

      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        return next(ApiError.unauthorized());
      }

      const isAllowedRole = userData.roles?.some((role) =>
        roles.includes(role)
      );
      if (!isAllowedRole) {
        return next(
          ApiError.forbidden("You don't have an access for this information")
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
