import { User } from '../user';
import { BaseResponse } from './base.response';

export interface LoginResponse extends BaseResponse {
  status: any;
  message: any;
  user: User;
  token: string;
}
