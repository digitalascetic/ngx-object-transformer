import {ObjectTransformer} from './object.transformer';

export class StringArrayTransformer implements ObjectTransformer {

    transformToObject(obj: string[]): string {
        if (!obj) {
            return null;
        }

        return obj.join(',');
    }

    transformFromObject(objStr: string, type: Function): any {
        if (!objStr) {
            return objStr;
        }

        return objStr.split(',');
    }
}
