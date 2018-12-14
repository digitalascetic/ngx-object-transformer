import {PropertyAccessorMapper} from "./property.accessor.mapper";
import {PropertyNameMapper} from "./property.name.mapper";

describe('PropertyNameMapper tests', () => {


    it('correctly convert accessor properties', () => {

        let propMapper: PropertyNameMapper = new PropertyAccessorMapper();

        expect(propMapper.getTransformedName('_test')).toBe('test');
        expect(propMapper.getTransformedName('test')).toBe('test');
        expect(propMapper.getOriginalName('test')).toBe('_test');

    });

});
