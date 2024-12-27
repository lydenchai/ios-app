import { LocalStorageEnum } from './../models/enums/local-storage.enum';
import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.authStatus) {
      const routePermissions = next.data['permissions'] as Array<string>;
      const permissions = this.localStorageService.getArray(
        LocalStorageEnum.permissions
      );
      if (
        !routePermissions ||
        routePermissions.length === 0 ||
        routePermissions.filter((p) => permissions.includes(p)).length > 0
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return !this.router.navigate(['']);
    }
  }
}
