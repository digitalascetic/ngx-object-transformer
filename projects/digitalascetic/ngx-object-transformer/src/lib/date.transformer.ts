import {format, isDate, parse} from 'date-fns';
import {ObjectTransformer} from './object.transformer';

export class DateTransformer implements ObjectTransformer {
    private _utc: boolean;
    private _format: string;

    constructor(formatDate: string, utc = false) {
        this._format = formatDate;
        this._utc = utc;
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

    transformFromObject(obj: any, type: Function): any {
        if (!obj) {
            return null;
        }

        if (Number.isInteger(obj)) {
            obj = String(obj);
        }

        if (typeof obj !== 'string') {
            throw obj + ' is not a valid type. Must by a string';
        }

        const formatPattern = this._format.replace(/Y/g, 'y').replace(/D/g, 'd');
        const parsedDate = parse(obj, formatPattern, new Date());

        /**
         * Handle Invalid Date
         * https://date-fns.org/v2.29.3/docs/parse
         */
        if (isNaN(parsedDate.getTime())) {
            const timestamp = Date.parse(obj);
            return new Date(timestamp);
        }

        if (this._utc) {
            return new Date(
                Date.UTC(
                    parsedDate.getFullYear(),
                    parsedDate.getMonth(),
                    parsedDate.getDate(),
                    parsedDate.getHours(),
                    parsedDate.getMinutes(),
                    parsedDate.getSeconds(),
                ),
            );
        }

        return parsedDate;
    }
}
