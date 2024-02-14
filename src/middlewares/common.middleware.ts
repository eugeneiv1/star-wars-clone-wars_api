import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../erros/api.error";

class CommonMiddleware {
  public isBodyValid(validator: ObjectSchema) {
    return function (req: Request, res: Response, next: NextFunction) {
      try {
        const { error } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.details[0].message, 401);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async isAdmin() {}
}

export const commonMiddleware = new CommonMiddleware();
