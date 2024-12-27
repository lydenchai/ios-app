import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';

export interface DeactivateCheck {
  onChange: boolean;
  onDeactivate(): Observable<boolean>;
}

@Injectable({
  providedIn: 'root',
})
export class DeactivateForm implements CanDeactivate<DeactivateCheck> {
  canDeactivate(
    component: DeactivateCheck,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.onChange) {
      return component.onDeactivate()?.pipe(
        map((response: boolean) => {
          return response;
        })
      );
    }
    return true;
  }
}
