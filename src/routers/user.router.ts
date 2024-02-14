import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { ERole } from "../enums/role.enum";
import { fileMiddleware } from "../middlewares/file.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.delete(
  "/user/:id",
  tokenMiddleware.checkAccessToken,
  userMiddleware.checkAccessByRole(ERole.ADMIN),
  userController.deleteUser,
);
router.post(
  "/user/avatar/:id",
  tokenMiddleware.checkAccessToken,
  fileMiddleware.isAvatarValid,
  userController.loadAvatar,
);

router.post(
  "/user/refreshTokens",
  tokenMiddleware.checkRefreshToken,
  userController.refreshTokens,
);

export const userRouter = router;
