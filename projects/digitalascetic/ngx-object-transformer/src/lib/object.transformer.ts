/**
 *
 */
export interface ObjectTransformer {

    transformToObject(obj: any): any;

    transformFromObject(obj: any, type: Function): any;

}
