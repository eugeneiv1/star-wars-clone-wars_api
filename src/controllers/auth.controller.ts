import { NextFunction, Request, Response } from "express";

import { UserPresenter } from "../presenters/user.presenter";
import { authService } from "../services/auth.service";

class AuthController {
  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const createdUser = await authService.signUp(user);
      res.status(200).json({
        data: UserPresenter.userToResponse(createdUser),
      });
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const jwtTokens = await authService.signIn(req.body);
      res.status(200).json(jwtTokens);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
