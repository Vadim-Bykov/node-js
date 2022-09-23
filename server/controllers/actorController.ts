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
