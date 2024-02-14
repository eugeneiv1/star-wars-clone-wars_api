import { FilterQuery } from "mongoose";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async create(dto: Partial<IUser>) {
    return await User.create(dto);
  }

  public async getOneByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async deleteById(id: string) {
    return await User.deleteOne({ _id: id });
  }
}

export const userRepository = new UserRepository();
