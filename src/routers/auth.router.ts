import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/admin/signup",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  authController.signup,
);

router.post(
  "/admin/signin",
  commonMiddleware.isBodyValid(UserValidator.signIn),
  authController.signIn,
);

export const authRouter = router;
