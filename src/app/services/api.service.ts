import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { RequestService } from './request.service';
import { RESPONSE_STATUS } from '../models/enums/response-status.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private requestService: RequestService = inject(RequestService);

  constructor() {}
}
