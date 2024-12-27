import { Router } from '@angular/router';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageEnum } from '../models/enums/local-storage.enum';
import { LocalStorageService } from './local-storage.service';
import { RequestService } from './request.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { LoadingService } from './loading.service';
import { MatDialog } from '@angular/material/dialog';
import { ROUTE_PERMISSIONS } from '../models/enums/route-permission';
import { FullFeedbackAlertType } from '../models/enums/full-feedback-alert-type';
import { BaseResponse } from '../models/responses/base.response';
import { LoginResponse } from '../models/responses/login-response';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isAuthorized
  );
  authStatus: boolean = this.isAuthorized;

  logOutEventEmitter: EventEmitter<boolean> = new EventEmitter();
  logInEventEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private _loadingService: LoadingService,
    private requestService: RequestService,
    private translate: TranslateService,
    private router: Router,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {}

  login(data: any): Observable<LoginResponse> {
    return this.requestService
      .postJSON<LoginResponse>('/login', {
        data,
        option: {
          is_loading: true,
          is_alert_error: true,
          is_login: true,
        },
      })
      .pipe(
        map((res: any) => {
          if (res) {
            if (res.status === 1) {
              this.onSuccessLogin(res);
              this.snackBar.open(
                res.status === 1
                  ? this.translate.instant('general.msg_success')
                  : this.translate.instant('general.msg_fail'),
                '',
                {
                  duration: 1000,
                  horizontalPosition: 'center',
                  panelClass: 'panel-success',
                }
              );
            }
            return res;
          } else {
            this.snackBar.open(
              this.translate.instant('form.login.incorrect'),
              '',
              {
                duration: 1000,
                horizontalPosition: 'center',
                panelClass: 'panel-error',
              }
            );
          }
        })
      );
  }

  oauthLogin(data: any): Observable<LoginResponse> {
    return this.requestService
      .postJSON<LoginResponse>('/oauth/login', {
        data,
        option: {
          is_loading: true,
          is_alert_error: false,
          is_login: false,
        },
      })
      .pipe(
        map((res: any) => {
          this._loadingService.setLoading(false);
          if (res) {
            if (res.status === 1) {
              this.onSuccessLogin(res);
            }
            return res;
          }
        })
      );
  }

  onSuccessLogin(res: any) {
    let expiry_time = new Date(res.data.expiresIn).getTime();
    this.localStorageService.set(LocalStorageEnum.lang, this.getLang());
    this.localStorageService.set(LocalStorageEnum.token, res.data.token);
    this.localStorageService.set(
      LocalStorageEnum.expiry_time,
      expiry_time.toString()
    );
    this.localStorageService.set(
      LocalStorageEnum.refresh_token,
      res.data.refresh_token
    );
    let permissions = [];
    let roles = res.data.user.roles;
    if (Array.isArray(roles)) {
      // @ts-ignore
      permissions = roles.map((role) => role.permissions).flat();
    } else {
      permissions = res.data.user.role?.permissions;
    }
    this.localStorageService.setArray(
      LocalStorageEnum.permissions,
      permissions
    );

    this.localStorageService.encryptSpecialCharacter(
      LocalStorageEnum.user,
      JSON.stringify(res.data.user)
    );
    this.markStatusChange();
    this.onNavigateWhenSuccessLogin(
      permissions,
      res.data.user.roles[0]?.default_page
    );
  }

  getLang() {
    let lang = localStorage.getItem(LocalStorageEnum.lang);
    if (!lang) {
      lang = 'km';
    }
    return lang;
  }

  logout() {
    return new Observable<BaseResponse>((observer) => {
      observer.next({ status: 1, message: '' });
      observer.complete();
      this.markStatusChange();
    });
  }

  getNewToken() {
    const url = '/refresh-token';
    return this.requestService
      .postJSON(url, {
        data: { is_refresh_token: true },
        option: {
          is_loading: true,
        },
      })
      .pipe(
        map((res: any) => {
          if (res.status === 1) {
            let expiry_time = res.data.expiresIn;
            this.localStorageService.set(
              LocalStorageEnum.token,
              res.data.token
            );
            this.localStorageService.set(
              LocalStorageEnum.refresh_token,
              res.data.refresh_token
            );
            this.localStorageService.set(
              LocalStorageEnum.expiry_time,
              expiry_time.toString()
            );
          }
          return res;
        })
      );
  }

  private markStatusChange() {
    this.authChange$.next(this.isAuthorized);
    this.authStatus = this.isAuthorized;
  }

  private onNavigateWhenSuccessLogin(
    permissions: string[],
    default_page?: string
  ) {
    if (default_page) {
      this.router.navigateByUrl(default_page);
    } else {
      if (
        ROUTE_PERMISSIONS.DASHBOARD.filter((p: any) => permissions.includes(p))
          .length > 0
      ) {
        this.router.navigateByUrl('/dashboard');
      } else {
        let route_data = this.router.config[1].children;
        route_data?.find((route) => {
          if (
            route.data &&
            route.data['permissions'] &&
            route.data['permissions'].length > 0
          ) {
            if (
              route.data['permissions'].filter((p: string) =>
                permissions.includes(p)
              ).length > 0
            ) {
              this.router.navigateByUrl(`/${route.path}`);
            }
          }
        });
      }
    }
  }

  get isAuthorized(): boolean {
    let exptime =
      parseInt(this.localStorageService.get(LocalStorageEnum.expiry_time)) *
      1000;
    return moment().isBefore(exptime);
  }
}
