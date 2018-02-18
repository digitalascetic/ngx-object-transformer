import {PropertyNameMapper} from "./property.name.mapper";
import {Injectable} from "@angular/core";

@Injectable()
export class PropertyAccessorMapper implements PropertyNameMapper {

    getTransformedName(propName: string, obj?: any): string {
        if (propName.substr(0, 1) === '_') {
            return propName.substr(1);
        }
        return propName;
    }

    getOriginalName(transformedName: string, obj?: any): string {
        return '_' + transformedName;
    }


}
