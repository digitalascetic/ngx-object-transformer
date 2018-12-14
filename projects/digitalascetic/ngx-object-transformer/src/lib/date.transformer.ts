import * as moment_ from 'moment';
import {ObjectTransformer} from './object.transformer';

// Avoid Cannot call a namespace ('moment')
const moment = moment_;

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment_.Moment = (<any>moment).default || moment;

export class DateTransformer implements ObjectTransformer {

    private _format: string;

    private _toUTC: boolean;

    constructor(format: string, toUTC: boolean = false) {
        this._format = format;
        this._toUTC = toUTC;
    }

    transformToObject(obj: Date): any {
        if (!obj) {
            return null;
        }

        const dateField = momentConstructor(obj);

        if (this._toUTC) {
            dateField.utc();
        }

        return dateField.format(this._format);
    }

    transformFromObject(objStr: string, type: Function): any {
        if (!objStr) {
            return null;
        }

        if (this._toUTC) {
            return moment.parseZone(objStr, this._format).toDate();
        }

        return moment(objStr, this._format).utc().toDate();
    }
}
