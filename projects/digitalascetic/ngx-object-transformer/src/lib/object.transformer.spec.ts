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

  it("Throw exception when date is not a valid type", () => {

    const dateStr = 1965;
    const date = new Date(String(dateStr));
    const dateTransformer = new DateTransformer("YYYY");
    try {
      const transformedDate = dateTransformer.transformFromObject(dateStr, Date);

      expect(transformedDate.getFullYear()).toBe(date.getFullYear());
      expect(transformedDate.getMonth()).toBe(date.getMonth());
      expect(transformedDate.getDay()).toBe(date.getDay());
    } catch (e) {
      expect(e).toBe("1965 is not a valid type. Must by a string");
    }
  });

  describe("UTC flag", () => {

    it("transformFromObject with utc=true stores string values in UTC fields", () => {
      const dateTransformer = new DateTransformer("YYYY-MM-DD HH:mm:ss", true);
      const result = dateTransformer.transformFromObject("2023-06-15 08:30:45", Date);

      expect(result).not.toBeNull();
      expect(result.getUTCFullYear()).toBe(2023);
      expect(result.getUTCMonth()).toBe(5); // 0-indexed
      expect(result.getUTCDate()).toBe(15);
      expect(result.getUTCHours()).toBe(8);
      expect(result.getUTCMinutes()).toBe(30);
      expect(result.getUTCSeconds()).toBe(45);
    });

    it("transformFromObject with utc=false stores string values in local fields", () => {
      const dateTransformer = new DateTransformer("YYYY-MM-DD HH:mm:ss", false);
      const result = dateTransformer.transformFromObject("2023-06-15 08:30:45", Date);

      expect(result).not.toBeNull();
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(5); // 0-indexed
      expect(result.getDate()).toBe(15);
      expect(result.getHours()).toBe(8);
      expect(result.getMinutes()).toBe(30);
      expect(result.getSeconds()).toBe(45);
    });

    it("transformFromObject utc=true and utc=false produce different timestamps in non-UTC timezone", () => {
      const input = "2023-06-15 12:00:00";
      const format = "YYYY-MM-DD HH:mm:ss";

      const localResult = new DateTransformer(format, false).transformFromObject(input, Date);
      const utcResult = new DateTransformer(format, true).transformFromObject(input, Date);

      // utcResult interprets the string as UTC noon; localResult as local noon.
      // getTimezoneOffset() = UTC - local (minutes), so the difference is -offsetMs.
      const offsetMs = new Date().getTimezoneOffset() * 60 * 1000;
      expect(utcResult.getTime() - localResult.getTime()).toBe(-offsetMs);
    });

    it("transformFromObject with utc=true returns null for falsy input", () => {
      const dateTransformer = new DateTransformer("YYYY-MM-DD", true);
      expect(dateTransformer.transformFromObject(null, Date)).toBeNull();
      expect(dateTransformer.transformFromObject("", Date)).toBeNull();
    });

    it("transformToObject is not affected by the utc flag", () => {
      const date = new Date(2023, 5, 15, 8, 30, 45); // local time
      const localTransformer = new DateTransformer("YYYY-MM-DD HH:mm:ss", false);
      const utcTransformer = new DateTransformer("YYYY-MM-DD HH:mm:ss", true);

      expect(localTransformer.transformToObject(date)).toBe(utcTransformer.transformToObject(date));
    });

  });

});

