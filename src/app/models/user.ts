import { IRole } from './role';

export interface User {
  _id: string;
  dob: Date;
  first_name?: string;
  last_name?: string;
  first_name_kh?: string;
  last_name_kh?: string;
  first_name_en?: string;
  name_kh: string;
  name_en: string;
  last_name_en?: string;
  username: string;
  phone_number: string;
  email: string;
  personal_code: string;
  role: IRole;
  password?: string;
  gender?: string;
  is_active?: boolean;
  avatar: string;
  phone: string;
  position: any;
  roles: Array<IRole> | string[];
}
