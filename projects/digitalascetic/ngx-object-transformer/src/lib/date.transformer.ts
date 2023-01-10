import {ObjectTransformer} from './object.transformer';
import {format, parse} from 'date-fns';

export class DateTransformer implements ObjectTransformer {

  private _format: string;

  constructor(format: string) {
    this._format = format;
  }

  transformToObject(obj: Date): any {
    if (!obj) {
      return null;
    }

    /* According to https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md#popular-mistakes */
    const formatPattern = this._format.replace(/Y/g, 'y').replace(/D/g, 'd');

    return format(obj, formatPattern);
  }

  transformFromObject(objStr: string, type: Function): any {
    if (!objStr) {
      return null;
    }
    const formatPattern = this._format.replace(/Y/g, 'y').replace(/D/g, 'd');
    return parse(objStr, formatPattern, new Date());
  }
}
