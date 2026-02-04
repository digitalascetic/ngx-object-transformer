import {ObjectTransformer} from './object.transformer';

export class SimpleObjectTransformer implements ObjectTransformer {

  transformToObject(obj: any): string {
    if (!obj) {
      return null;
    }

    return JSON.stringify(obj);
  }

  transformFromObject(obj: any, type: Function): any {
    if (!obj || typeof obj !== 'string') {
      return obj;
    }

    return JSON.parse(obj);
  }
}
