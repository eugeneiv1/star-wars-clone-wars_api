import { NextFunction, Request, Response } from "express";

import { ETokenEnum } from "../enums/token.enum";
import { ApiError } from "../erros/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class TokenMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const accessToken = req.get("Authorization").split("Bearer ")[1];
      const payload = tokenService.checkToken(accessToken, ETokenEnum.ACCESS);
      const entity = await tokenRepository.getOneByParams({ accessToken });
      if (!entity) {
        throw new ApiError("Token is not valid", 400);
      }
      req.res.locals.payload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.get("Authorization").split("Bearer ")[1];
      const payload = tokenService.checkToken(refreshToken, ETokenEnum.REFRESH);
      const entity = await tokenRepository.getOneByParams({ refreshToken });
      if (!entity) {
        throw new ApiError("Token is not valid", 400);
      }
      req.res.locals.payload = payload;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const tokenMiddleware = new TokenMiddleware();
