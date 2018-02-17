/**
 *
 */
export interface PropertyNameMapper {

    getTransformedName(propName: string, obj?: any): string;

    getOriginalName(transformedName: string, obj?: any): string;

}
