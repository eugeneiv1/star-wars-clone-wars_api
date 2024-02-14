import { model, Schema, Types } from "mongoose";

import { ITokenPair } from "../interfaces/token.interface";
import { User } from "./user.model";

const TokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Token = model<ITokenPair>("token", TokenSchema);
