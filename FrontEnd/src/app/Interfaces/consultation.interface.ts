export interface IConsultation {
  id?: number | null;
  consultationMsg: string;
  isRead?: boolean;
  registerDate?:string;
  user_id?:number | null;
}
