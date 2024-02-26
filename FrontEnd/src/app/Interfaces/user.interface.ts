export interface IUser {
  id: number | null;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  gender: number;
  accountType: number;
  password?: string;
  password_confirmation?: string;
  mobile_phone: number;
  home_phone: number;
  amka: number;
  last_login?:string;
  created_at?:string;
}
