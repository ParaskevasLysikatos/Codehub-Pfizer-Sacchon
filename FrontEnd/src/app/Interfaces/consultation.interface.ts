import { IUser } from "./user.interface";

export interface IConsultation {
  id?: number | null;
  consultationMsg: string;
  isRead?: boolean;
  registerDate?:string;
  user_id?:number | null;
  user?:IUser;
}
