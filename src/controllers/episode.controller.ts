import { NextFunction, Request, Response } from "express";

import { EpisodePresenter } from "../presenters/episode.presenter";
import { episodeService } from "../services/episodeService";

class EpisodeController {
  public async addEpisode(req: Request, res: Response, next: NextFunction) {
    try {
      const episodeInfo = req.body;
      const posterName = `S${req.body.season}E${req.body.episodeNumber}`;
      const posterPath = await episodeService.UploadPoster(
        req.files.episodeAvatar,
        posterName,
      );
      const createdEpisode = await episodeService.addEpisode({
        ...episodeInfo,
        episodeAvatar: posterPath,
      });
      res
        .status(200)
        .json({ data: EpisodePresenter.episodeToResponse(createdEpisode) });
    } catch (e) {
      next(e);
    }
  }
}

export const episodeController = new EpisodeController();
