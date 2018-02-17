import {DateTransformer, PropertyAccessorMapper, PropertyNameMapper} from "../index";
import {TestAcessorObject} from "./test.accessor.object";

describe('Metadata tests', () => {


    it('convert Date object to string', () => {

        let dateTransformer = new DateTransformer('YYYY-MM-DD');
        let date = new Date();
        date.setFullYear(2018, 1, 1);

        let stringDate = dateTransformer.transformToObject(date);

        expect(stringDate).toBeDefined();
        expect(stringDate).not.toBeNull();
        expect(stringDate).toBe('2018-02-01');

    });

    it('convert string to Date objexct', () => {

        let stringDate = '2018-02-01';
        let dateTransformer = new DateTransformer('YYYY-MM-DD');

        let transformedDate = dateTransformer.transformFromObject(stringDate, Date);

        expect(transformedDate).toBeDefined();
        expect(transformedDate).not.toBeNull();
        let date = new Date();
        date.setFullYear(2018, 1, 1);
        if (transformedDate) {
            expect(transformedDate.getFullYear()).toBe(date.getFullYear());
            expect(transformedDate.getMonth()).toBe(date.getMonth());
            expect(transformedDate.getDay()).toBe(date.getDay());
        }

    });

    it('correctly convert accessor properties', () => {

           let propMapper: PropertyNameMapper = new PropertyAccessorMapper();

           expect(propMapper.getTransformedName('_test')).toBe('test');
           expect(propMapper.getTransformedName('test')).toBe('test');
           expect(propMapper.getOriginalName('test')).toBe('_test');

    });

});
