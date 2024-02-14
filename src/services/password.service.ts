import bcrypt from "bcrypt";

import { configs } from "../configs/configs";
class PasswordService {
  public async hash(password: string) {
    return await bcrypt.hash(password, configs.SECRET_SALT);
  }

  public async match(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordService = new PasswordService();
