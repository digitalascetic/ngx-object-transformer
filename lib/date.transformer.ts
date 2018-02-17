import * as moment from 'moment';
import {ObjectTransformer} from "./object.transformer";
import {Injectable} from "@angular/core";

// under systemjs, moment is actually exported as the default export, so we account for that
const momentConstructor: (value?: any) => moment.Moment = (<any>moment).default || moment;

@Injectable()
export class DateTransformer implements ObjectTransformer {

    private _format: string;

    constructor(format: string) {
        this._format = format;
    }

    transformToObject(obj: Date): any {
        if (!obj) {
            return null;
        }
        let dateField = momentConstructor(obj);
        return dateField.format(this._format);
    }

    transformFromObject(objStr: string, type: Function): any {
        if (!objStr) {
            return null;
        }
        return moment.parseZone(objStr, this._format).toDate();
    }
}
