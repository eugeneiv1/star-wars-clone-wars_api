import jwt from "jsonwebtoken";

import { configs } from "../configs/configs";
import { ETokenEnum } from "../enums/token.enum";
import { ApiError } from "../erros/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_TOKEN_SECRET, {
      expiresIn: configs.ACCESS_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_TOKEN_SECRET, {
      expiresIn: configs.REFRESH_EXPIRES_IN,
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  public checkToken(jwtToken: string, tokenType: ETokenEnum): ITokenPayload {
    try {
      let secret: string;
      switch (tokenType) {
        case "accessToken":
          secret = configs.ACCESS_TOKEN_SECRET;
          break;
        case "refreshToken":
          secret = configs.REFRESH_TOKEN_SECRET;
      }

      return jwt.verify(jwtToken, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token is not valid", 400);
    }
  }
}

export const tokenService = new TokenService();
