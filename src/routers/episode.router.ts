import { Router } from "express";

import { episodeController } from "../controllers/episode.controller";
import { ERole } from "../enums/role.enum";
import { episodeMiddleware } from "../middlewares/episode.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { EpisodeValidator } from "../validators/episode.validator";

const router = Router();

router.post(
  "/addEpisode",
  episodeMiddleware.isEpisodeInfoValid(EpisodeValidator.isEpisodeValid),
  tokenMiddleware.checkAccessToken,
  userMiddleware.checkAccessByRole(ERole.ADMIN),
  episodeController.addEpisode,
);

export const episodeRouter = router;
