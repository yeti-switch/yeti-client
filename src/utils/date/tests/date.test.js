import * as date from '../date';

describe('date helper', () => {
  describe('formatDateFromObject', () => {
    it('construct correct date string if date object is passed', () => {
      const correctInitialParams = new Date(Date.parse('Sat May 02 2020 14:25:05 GMT+0200'));
      const expectedResult = '2020-05-02 14:25:05';

      const result = date.formatDateFromObject(correctInitialParams);

      expect(result).toBe(expectedResult);
    });
  });
  describe('formatDateFromString', () => {
    it('construct correct date string if date string is passed', () => {
      const correctInitialParams = '2020-01-20T15:01:58.957Z';
      const expectedResult = '2020-01-20 16:01:58';

      const result = date.formatDateFromString(correctInitialParams);

      expect(result).toBe(expectedResult);
    });
    test.each([[null, ''], [undefined, ''], ['', '']])('returns empty string for Nil and empty string', (input, expected) => {
      const result = date.formatDateFromString(input);

      expect(result).toBe(expected);
    });
  });
});
