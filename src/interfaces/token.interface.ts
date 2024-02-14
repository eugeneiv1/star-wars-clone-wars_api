import { Types } from "mongoose";

import { ERole } from "../enums/role.enum";

export interface IToken extends ITokenPair {
  userId: Types.ObjectId;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  userId: Types.ObjectId;
  role: ERole;
}
