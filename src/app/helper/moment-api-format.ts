import * as moment from 'moment';

export function momentApiFormat(value: any, format: string) {
  if (value) {
    const m = moment(value);
    if (m.isValid()) {
      return m.locale('en-US').format(format);
    }
  }
  return null;
}
