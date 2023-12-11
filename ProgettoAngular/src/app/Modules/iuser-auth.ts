import { IUser } from "./iuser";

export interface IUserAuth {
  accessToken: string;
  user:IUser;
}
