import { ApiError } from "../erros/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { User } from "../models/user.model";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";
import { tokenService } from "./token.service";

class UserService {
  public async deleteUserById(id: string): Promise<void> {
    const user = await userRepository.getOneByParams({ _id: id });
    if (!user) {
      throw new ApiError("User doesn't exist", 400);
    }
    await userRepository.deleteById(id);
  }

  public async uploadAvatar(userId, avatar) {
    const user = await userRepository.getOneByParams({ _id: userId });
    if (!user) {
      throw new ApiError("User doesn't exist", 400);
    }
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    const filePath = await s3Service.uploadFile(avatar, "user", userId);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $set: { avatar: filePath },
      new: true,
    });
    return updatedUser;
  }
  public async refreshTokens(payload: ITokenPayload) {
    const tokenPair = tokenService.generateTokenPair({
      userId: payload.userId,
      role: payload.role,
    });
    await tokenRepository.findOneAndUpdate(
      {
        userId: payload.userId,
      },
      tokenPair,
    );
    return tokenPair;
  }
}

export const userService = new UserService();
