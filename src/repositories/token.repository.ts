import { FilterQuery } from "mongoose";

import { IToken, ITokenPair } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async create(tokens: Partial<IToken>) {
    return await Token.create(tokens);
  }
  public async getOneByParams(params: Partial<ITokenPair>) {
    return await Token.findOne(params).populate("userId");
  }

  public async findOneAndUpdate(params: FilterQuery<ITokenPair>, update) {
    return Token.findOneAndUpdate(params, update, { new: true });
  }
}

export const tokenRepository = new TokenRepository();
