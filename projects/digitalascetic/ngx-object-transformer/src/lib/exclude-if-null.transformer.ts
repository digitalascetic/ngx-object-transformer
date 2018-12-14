import {ObjectTransformer} from './object.transformer';

export class ExcludeIfNullTransformer implements ObjectTransformer {

    private _excludeOut: boolean = false;

    private _excludeIn: boolean = false;

    constructor(excludeOut: boolean = false, excludeIn: boolean = false) {
        this._excludeOut = excludeOut;
        this._excludeIn = excludeIn;
    }

    transformToObject(obj: any): any {
        if (this._excludeOut) {
            return undefined;
        }
        return obj;
    }

    transformFromObject(obj: any, type: Function): any {
        if (this._excludeIn) {
            return undefined;
        }
        return obj;
    }
}
