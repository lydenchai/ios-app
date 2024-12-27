import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LocalStorageEnum } from '../models/enums/local-storage.enum';

import { LocalStorageService } from './local-storage.service';
import { RequestService } from './request.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { User } from '../models/user';
import { LANG } from '../models/enums/lang.enum';
import { HeaderTitle } from '../models/header-title';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  currentLang!: LANG;
  menuChange = new EventEmitter<boolean>();
  navigationScroll = new EventEmitter<any>();
  headerTitle = new EventEmitter<HeaderTitle | null>();
  showActionButton = new EventEmitter<boolean>();
  navigationScrollRef!: any;

  protected static KHMER_NUMBER = [
    '\u17E0',
    '\u17E1',
    '\u17E2',
    '\u17E3',
    '\u17E4',
    '\u17E5',
    '\u17E6',
    '\u17E7',
    '\u17E8',
    '\u17E9',
  ];

  constructor(
    private translate: TranslateService,
    private localStorage: LocalStorageService,
    private request: RequestService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /**
   * @description: Set Max Date
   * @=====================================================
   *
   */

  maxTodayDate() {
    return moment().toDate();
  }

  maxDob(year_config: number = 15) {
    return moment().subtract(year_config, 'years').toDate();
  }

  /**
   * @description: Show (value: string) on toolbar
   * @=====================================================
   *
   * @usage: this._utility.setHeaderTitle({ titleKM: nameKh, titleEN: nameEn, code: data.id});
   * @param title
   */
  setHeaderTitle(title: HeaderTitle | null = null) {
    this.headerTitle.emit(title);
  }

  /**
   * @description: Scroll into view
   * @=====================================================
   *
   * @usage: this._utility.scrollIntoView('some_html_element_id')
   * @param el
   * @param options
   */
  scrollIntoView(
    el: HTMLElement,
    options?: Partial<ScrollIntoViewOptions>
  ): void {
    this.navigationScrollRef.scrollIntoView(el, options);
  }

  /**
   * @description: Reset scroll back to start position
   * (top: 0, left: 0)
   * @=====================================================
   *
   * @usage: this._utility.resetNavigationScroll();
   */
  resetNavigationScroll(): void {
    this.navigationScrollRef.scrollTo(0, 0, 100);
  }

  /**
   * @description: Initialize app translation
   * @=====================================================
   *
   * @usage: this._utility.initializeTranslate();
   */
  initializeTranslate(): number {
    this.currentLang = this.localStorage.get(LocalStorageEnum.lang) as LANG;
    const lang = this.currentLang || LANG.KM;
    return this.setDefaultLang(lang);
  }

  /**
   * @description: Set app default lang ('km' | 'en')
   * @=====================================================
   *
   * @usage: this.setDefaultLang(lang);
   * @param lang
   */
  setDefaultLang(lang: LANG): number {
    if (!this.availableLangs.includes(lang)) lang = LANG.KM;
    try {
      this.localStorage.set(LocalStorageEnum.lang, lang);
      this.translate.use(lang);
      this.currentLang = lang;
      return 1;
    } catch (error) {
      return 0;
    }
  }

  /**
   * @description: List supporting langugages
   * @=====================================================
   */
  get availableLangs(): LANG[] {
    return [LANG.KM, LANG.EN];
  }

  /**
   * @description: Get saved lang
   * on localstorage ('km' | 'en')
   * @=====================================================
   */
  getLang() {
    let lang = localStorage.getItem(LocalStorageEnum.lang);
    if (!lang) lang = 'km';

    return lang;
  }

  /**
   * @description: Description not available
   * @=====================================================
   */
  getLocaleIdValue() {
    return this.translate.currentLang == LANG.KM ? 'km_KH' : 'en_US';
  }

  /**
   * @description: Get Branches
   * @=====================================================
   */
  getBranches(query: any): Observable<any> {
    return this.request.postJSON('/branch', {
      data: query,
      option: {
        is_loading: true,
      },
    });
  }

  /**
   * @description: Get permissions of
   * current login user
   * @=====================================================
   *
   * @usage: let permissions = this._utility.getArrayPermission();
   */
  getArrayPermission() {
    return this.localStorage.getArray(LocalStorageEnum.permissions);
  }

  /**
   * @description: Get Current Login User Information
   * @=====================================================
   *
   * @usage: let curentUser = this._utility.getCurrentLoginUser();
   */
  getCurrentLoginUser() {
    let value: any = this.localStorage.decryptSpecialCharacter(
      LocalStorageEnum.user
    );
    return JSON.parse(value ? value : '') as User;
  }

  /**
   * @description: Get expired time of
   * current loged in token
   * @=====================================================
   *
   * @usage: let exp_time = this._utility.getExpiredTime();
   */
  getExpiredTime() {
    return parseInt(this.localStorage.get(LocalStorageEnum.expiry_time)) * 1000;
  }

  /**
   * @description: When login success,
   * save data on localstorage
   * @=====================================================
   */
  onSetUpSuccessLogin(res: any) {
    let expiry_time = new Date(res.data.expiresIn).getTime();
    this.localStorage.set(LocalStorageEnum.lang, this.getLang());
    this.localStorage.set(LocalStorageEnum.token, res.data.token);
    this.localStorage.set(LocalStorageEnum.expiry_time, expiry_time.toString());
    this.localStorage.set(
      LocalStorageEnum.refresh_token,
      res.data.refresh_token
    );
    this.localStorage.encryptSpecialCharacter(
      LocalStorageEnum.user,
      JSON.stringify(res.data.user)
    );
  }

  /**
   * @description: When get new token,
   * save new token information on localstorage
   * @=====================================================
   */
  onSetUpRefreshToken(res: any) {
    let expiry_time = res.data.expiresIn;
    this.localStorage.set(LocalStorageEnum.token, res.data.token);
    this.localStorage.set(
      LocalStorageEnum.refresh_token,
      res.data.refresh_token
    );
    this.localStorage.set(LocalStorageEnum.expiry_time, expiry_time.toString());
  }

  /**
   * @description: When log out of app,
   * clean localstorage and navigate to login
   * @=====================================================
   */
  onSignOut() {
    this.localStorage.delete(LocalStorageEnum.token);
    this.localStorage.delete(LocalStorageEnum.expiry_time);
    this.localStorage.delete(LocalStorageEnum.refresh_token);
    this.localStorage.delete(LocalStorageEnum.permissions);
    this.localStorage.delete(LocalStorageEnum.user);
    this.router.navigate(['/login']);
  }

  /**
   * @description: Clean authentication information
   * @=====================================================
   */
  onCleanAuthInfo() {
    this.localStorage.delete(LocalStorageEnum.token);
    this.localStorage.delete(LocalStorageEnum.expiry_time);
    this.localStorage.delete(LocalStorageEnum.refresh_token);
    this.localStorage.delete(LocalStorageEnum.permissions);
    this.localStorage.delete(LocalStorageEnum.user);
  }

  /**
   * @description: Format date string to desired formats,
   * defualt format: ('YYYY-MM-DD')
   * @=====================================================
   *
   * @usage: this._utility.momentFormat('2023-10-13T00:00:00.000Z')
   * @param inp
   * @param [format = 'YYYY-MM-DD']
   */
  momentFormat(inp: string, format: string = 'YYYY-MM-DD') {
    return moment(inp).locale('en-US').format(format);
  }

  localizeValue(value: Date, template: string = 'DD-MMM-yyyy') {
    return moment(value)
      .locale(this.currentLang)
      .format(template)
      .replace(/[\u17E0-\u17E9]/g, function (match: string) {
        let val = UtilService.KHMER_NUMBER.indexOf(match);
        return val.toString();
      });
  }

  formatMessage(
    message: string,
    params: { name: string; value: string }[]
  ): string {
    const paramMap = new Map(params.map((param) => [param.name, param.value]));
    return message.replace(/{(.*?)}/g, (match, placeholder) => {
      return paramMap.get(placeholder) || match;
    });
  }

  formatMessageError(error: any) {
    if (!error?.code) {
      return '';
    }
    if (error.params && error.params.length > 0) {
      return this.formatMessage(
        this.translate.instant(`error_code.${error.code}`),
        error.params.map((pam: any) => {
          return { name: pam.name, value: this.localizeValue(pam.value) };
        })
      );
    } else {
      return `error_code.${error?.code}`;
    }
  }
}
