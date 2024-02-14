import { NextFunction, Request, Response } from "express";

import { seasonService } from "../services/season.service";

class SeasonController {
  public async getAllSeasons(req: Request, res: Response, next: NextFunction) {
    try {
      const seasons = await seasonService.getAll();
      res.status(200).json({ data: seasons });
    } catch (e) {
      next(e);
    }
  }
}

export const seasonController = new SeasonController();
