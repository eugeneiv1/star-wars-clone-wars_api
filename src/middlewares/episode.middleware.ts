import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../erros/api.error";

class EpisodeMiddleware {
  public isEpisodeInfoValid(validator: ObjectSchema) {
    return function (req: Request, res: Response, next: NextFunction) {
      try {
        const { size, mimetype } = req.files;
        const { error } = validator.validate({
          ...req.body,
          episodeAvatar: { size, mimetype },
        });
        next();
        if (error) {
          throw new ApiError("Data not valid", 400);
        }
      } catch (e) {
        next(e);
      }
    };
  }
}

export const episodeMiddleware = new EpisodeMiddleware();
