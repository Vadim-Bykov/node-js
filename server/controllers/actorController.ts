import { RequestHandler } from 'express';
import { ActorData } from '../models/ActorModel';
import { UploadedFile } from 'express-fileupload';
import * as actorService from '../services/actorService';

export const add: RequestHandler<any, any, ActorData> = async (
  req,
  res,
  next
) => {
  try {
    const actor = await actorService.add(req.body);

    res.json(actor);
  } catch (error) {
    next(error);
  }
};
