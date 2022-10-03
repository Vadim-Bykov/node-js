import { RequestHandler } from 'express';
import { ActorData } from '../models/ActorModel';
import { UploadedFile } from 'express-fileupload';
import * as actorService from '../services/actorService';
import { validationResult } from 'express-validator';
import { ApiError } from '../errors/ApiError';

export const add: RequestHandler<any, any, ActorData> = async (
  req,
  res,
  next
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.badRequest('Validation error', errors.array()));
    }

    const picture = req.files?.picture;
    const actor = await actorService.add({
      ...req.body,
      picture: picture as UploadedFile,
    });

    res.json(actor);
  } catch (error) {
    next(error);
  }
};

export const getActorByID: RequestHandler<{ id: string }> = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;
    const actor = await actorService.getActorByID(id);

    res.json(actor);
  } catch (error) {
    next(error);
  }
};

export const getAllActors: RequestHandler = async (req, res, next) => {
  try {
    const actors = await actorService.getAllActors();

    res.json(actors);
  } catch (error) {
    next(error);
  }
};
