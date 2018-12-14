import {ObjectTransformer} from './object.transformer';

export class SimpleObjectTransformer implements ObjectTransformer {

    transformToObject(obj: any): string {
        if (!obj) {
            return null;
        }

        return JSON.stringify(obj);
    }

    transformFromObject(objStr: string, type: Function): any {
        if (!objStr) {
            return objStr;
        }

        return JSON.parse(objStr);
    }
}
