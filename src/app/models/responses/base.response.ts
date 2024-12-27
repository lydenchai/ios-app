import { RESPONSE_STATUS } from 'src/app/models/enums/response-status.enum';

export interface BaseResponse {
  status: RESPONSE_STATUS;
  message: string;
  errors?: {
    [key: string]: string[];
  };
  data?: any;
  error_code?: any;
}
