import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./configs/configs";
import { ApiError } from "./erros/api.error";
import { authRouter } from "./routers/auth.router";
import { episodeRouter } from "./routers/episode.router";
import { seasonRouter } from "./routers/season.router";
import { userRouter } from "./routers/user.router";
import * as swaggerDocument from "./utils/swagger.json";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/episode", episodeRouter);
app.use("/seasons", seasonRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status | 500).json({
      message: err.message,
      status: err.status,
    });
  },
);

app.listen(configs.PORT, async () => {
  await mongoose.connect(configs.DB_URL);
  console.log(`Server is running on PORT: ${configs.PORT}`);
});
