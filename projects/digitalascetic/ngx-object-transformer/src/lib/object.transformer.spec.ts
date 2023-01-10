import {DateTransformer} from "./date.transformer";

describe("ObjectTransformer tests", () => {


    it("convert Date object to string", () => {

        const dateTransformer = new DateTransformer("YYYY-MM-DD");
        const date = new Date();
        date.setFullYear(2018, 1, 1);

        const stringDate = dateTransformer.transformToObject(date);

        expect(stringDate).toBeDefined();
        expect(stringDate).not.toBeNull();
        expect(stringDate).toBe("2018-02-01");

    });

    it("convert string to Date object", () => {

        const stringDate = "2018-02-01";
        const dateTransformer = new DateTransformer("YYYY-MM-DD");

        const transformedDate = dateTransformer.transformFromObject(stringDate, Date);

        expect(transformedDate).toBeDefined();
        expect(transformedDate).not.toBeNull();
        const date = new Date();
        date.setFullYear(2018, 1, 1);
        if (transformedDate) {
            expect(transformedDate.getFullYear()).toBe(date.getFullYear());
            expect(transformedDate.getMonth()).toBe(date.getMonth());
            expect(transformedDate.getDay()).toBe(date.getDay());
        }

    });

    it("convert Date object (LOCALTIME) to string (LOCALTIME) and string to Date (LOCALTIME)", () => {

        const dateStr = "2023-01-10 13:32:06";
        const date = new Date(dateStr);
        const dateTransformer = new DateTransformer("YYYY-MM-DD HH:mm:ss");

        const stringDate = dateTransformer.transformToObject(date);

        expect(stringDate).toBeDefined();
        expect(stringDate).not.toBeNull();
        expect(stringDate).toBe(dateStr);

        const transformedDate = dateTransformer.transformFromObject(stringDate, Date);

        if (transformedDate) {
            expect(transformedDate.getFullYear()).toBe(date.getFullYear());
            expect(transformedDate.getMonth()).toBe(date.getMonth());
            expect(transformedDate.getDay()).toBe(date.getDay());
            expect(transformedDate.getHours()).toBe(date.getHours());
            expect(transformedDate.getMinutes()).toBe(date.getMinutes());
            expect(transformedDate.getSeconds()).toBe(date.getSeconds());
        }

    });


});

