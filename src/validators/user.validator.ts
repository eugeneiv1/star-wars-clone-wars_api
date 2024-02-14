import joi from "joi";

import { regexConstant } from "../constants/regex.constants";
export class UserValidator {
  private static email = joi.string().regex(regexConstant.EMAIL).trim();
  private static password = joi.string().regex(regexConstant.PASSWORD).trim();
  private static userName = joi.string().min(3).max(20).trim();

  public static createUser = joi.object({
    email: this.email.required(),
    password: this.password.required(),
    userName: this.userName.required(),
    adminPassword: this.password,
  });

  public static signIn = joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
}
