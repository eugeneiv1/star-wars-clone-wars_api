import { NextFunction, Request, Response } from "express";

import { UserPresenter } from "../presenters/user.presenter";
import { userService } from "../services/user.service";

class UserController {
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const idToDelete = req.params.id;
      await userService.deleteUserById(idToDelete);
      res.status(200).json("OK");
    } catch (e) {
      next(e);
    }
  }

  public async loadAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.uploadAvatar(id, req.files.avatar);

      res.status(200).json({ data: UserPresenter.userToResponse(user) });
    } catch (e) {
      next(e);
    }
  }

  public async refreshTokens(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPair = await userService.refreshTokens(req.res.locals.payload);

      res.status(200).json(tokenPair);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
