import { Document } from "mongoose";

import { ERole } from "../enums/role.enum";

export interface IUser extends Document {
  email: string;
  password: string;
  userName: string;
  role: ERole;
  adminPassword?: string;
  avatar: string;
}
