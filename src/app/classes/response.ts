import { RESPONSE_STATUS } from '../models/enums/response-status.enum';

export class Response<D = null> {
  //@ts-ignore
  data: D = null;
  status: RESPONSE_STATUS = RESPONSE_STATUS.ERROR_CLIENT;

  message?: string;
  error_code?: string;
  pagination: { page: number; count: number; total: number } = {
    page: 1,
    count: 10,
    total: 1,
  };

  constructor(response: {
    data: D;
    status: RESPONSE_STATUS;
    message?: string;
    error_code?: string;
    pagination?: {
      page: number;
      count?: number;
      limit?: number;
      total: number;
    };
  }) {
    if (Boolean(response.data)) {
      this.data = response.data;
    }
    if (Boolean(response.status)) {
      this.status = response.status;
    }
    if (Boolean(response.message)) {
      this.message = response.message;
    }
    if (Boolean(response.error_code)) {
      this.error_code = response.error_code;
    }
    if (
      Boolean(response.pagination) &&
      response.pagination != null &&
      Object.keys(response.pagination).length > 0
    ) {
      this.pagination = {
        page: response.pagination.page,
        count: response.pagination?.count || response.pagination?.limit || 10,
        total: response.pagination?.total,
      };
    }
  }
}
