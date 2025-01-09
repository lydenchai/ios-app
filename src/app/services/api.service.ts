import { inject, Injectable } from '@angular/core'; 
import { RequestService } from './request.service'; 

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private requestService: RequestService = inject(RequestService);

  constructor() {}
}
