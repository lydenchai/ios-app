import { LOCALE_ID, Provider } from '@angular/core';
import { UtilService } from '../services/util.service';

export class LocaleId extends String {
  constructor(private utilService: UtilService) {
    super();
  }

  override toString(): string {
    return this.utilService.getLocaleIdValue();
  }

  override valueOf(): string {
    return this.toString();
  }
}

export const LocaleProvider: Provider = {
  provide: LOCALE_ID,
  useClass: LocaleId,
  deps: [UtilService],
};
