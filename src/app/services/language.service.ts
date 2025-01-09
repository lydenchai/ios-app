import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; 
import { LANG } from '../models/enums/lang.enum';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public readonly availableLanguages = Object.values(LANG);
  public currentLanguage: LANG = LANG.EN;
  public readonly defaultLanguage: LANG = LANG.EN

  constructor(private translate: TranslateService) {
    translate.addLangs(this.availableLanguages);
    this.setLang(this._getLang());
  }

  private _getLang() {
    var lang = localStorage.getItem("lang");
    if (!lang || !Object.values(LANG).includes(lang as unknown as LANG)) {
      lang = LANG.EN;
    }
    return lang as unknown as LANG;
  }

  setLang(lang: LANG) {
    if (this.availableLanguages.includes(lang)) {
      localStorage.setItem("lang", lang);
      this.translate.use(lang);
      this.currentLanguage = lang;      
    }
  }

}