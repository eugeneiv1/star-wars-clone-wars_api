import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { avatarConfig } from "../configs/avatar.config";
import { ApiError } from "../erros/api.error";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files)) {
        throw new ApiError("Avatar should be 1 file", 400);
      }
      const { mimetype, size } = req.files.avatar as UploadedFile;
      if (!avatarConfig.MIMETYPE.includes(mimetype)) {
        throw new ApiError("Mimetype should be png or jpeg", 400);
      }
      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError("Avatar max size is 10mb", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
