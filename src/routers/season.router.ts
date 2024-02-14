import { Router } from "express";

import { seasonController } from "../controllers/season.controller";

const router = Router();

router.get("/", seasonController.getAllSeasons);

export const seasonRouter = router;
