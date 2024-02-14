import { IUser } from "../interfaces/user.interface";

export class UserPresenter {
  public static userToResponse(user: IUser): Partial<IUser> {
    return {
      _id: user._id,
      email: user.email,
      userName: user.userName,
      role: user.role,
      avatar: user.avatar,
    };
  }
}
