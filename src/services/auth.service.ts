import { configs } from "../configs/configs";
import { ERole } from "../enums/role.enum";
import { ApiError } from "../erros/api.error";
import { IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: Partial<IUser>) {
    const user = await userRepository.getOneByParams({ email: dto.email });
    const { adminPassword, ...cleanObj } = dto;
    const hashedPassword = await passwordService.hash(dto.password);
    if (user) {
      throw new ApiError("User already exists", 400);
    }
    if (adminPassword && adminPassword === configs.ADMIN_SIGNUP_PASSWORD) {
      return await userRepository.create({
        ...cleanObj,
        role: ERole.ADMIN,
        password: hashedPassword,
      });
    } else {
      return await userRepository.create({
        ...cleanObj,
        password: hashedPassword,
      });
    }
  }

  public async signIn(dto: Partial<IUser>) {
    const user = await userRepository.getOneByParams({
      email: dto.email,
    });
    if (!user) {
      throw new ApiError("Email or password incorrect", 400);
    }
    const passwordIsMatched = await passwordService.match(
      dto.password,
      user.password,
    );
    if (!passwordIsMatched) {
      throw new ApiError("Email or password incorrect", 400);
    }
    const jwtTokens = tokenService.generateTokenPair({
      userId: user._id,
      role: user.role,
    });

    await tokenRepository.create({ ...jwtTokens, userId: user._id });
    return jwtTokens;
  }
}

export const authService = new AuthService();
