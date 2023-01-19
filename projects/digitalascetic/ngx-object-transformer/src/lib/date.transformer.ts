import {format, isDate, parse} from 'date-fns';
import {ObjectTransformer} from "./object.transformer";

export class DateTransformer implements ObjectTransformer {

  private _format: string;

  constructor(formatDate: string) {
    this._format = formatDate;
  }

  transformToObject(obj: any): any {
    if (!obj) {
      return null;
    }

    /* According to https://github.com/date-fns/date-fns/blob/main/docs/unicodeTokens.md#popular-mistakes */
    const formatPattern = this._format.replace(/Y/g, 'y').replace(/D/g, 'd');
    const dateToFormat = !isDate(obj) ? new Date(obj) : obj;
    return format(dateToFormat, formatPattern);
  }

  transformFromObject(objStr: string, type: Function): any {
    if (!objStr) {
      return null;
    }

    const formatPattern = this._format.replace(/Y/g, 'y').replace(/D/g, 'd');
    const parsedDate = parse(objStr, formatPattern, new Date());

    /**
     * Handle Invalid Date
     * https://date-fns.org/v2.29.3/docs/parse
     */
    if (isNaN(parsedDate.getTime())) {
      const timestamp = Date.parse(objStr);
      return new Date(timestamp);
    }

    return parsedDate;
  }
}
