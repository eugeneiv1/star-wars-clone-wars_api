import { NextFunction, Request, Response } from "express";

import { ERole } from "../enums/role.enum";
import { ApiError } from "../erros/api.error";

class UserMiddleware {
  public checkAccessByRole(...role: ERole[]) {
    return function (req: Request, res: Response, next: NextFunction) {
      try {
        const payload = req.res.locals.payload;
        if (!role.includes(payload.role)) {
          throw new ApiError("Access denined", 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
