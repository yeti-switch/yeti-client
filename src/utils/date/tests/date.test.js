import * as date from '../date';

describe('date helper', () => {
  describe('formatDateFromObject', () => {
    it('construct correct date string if date object is passed', () => {
      const correctInitialParams = new Date('Sat May 02 2020 14:25:05 GMT+0200');

      const expectedResult = date.createDateForTestResult(correctInitialParams);

      const result = date.formatDateFromObject(correctInitialParams);

      expect(result).toBe(expectedResult);
    });
  });
  describe('formatDateFromString', () => {
    it('construct correct date string if date string is passed', () => {
      const correctInitialParams = '2020-01-20T15:01:58.957Z';

      const expectedResult = date.createDateForTestResult(correctInitialParams);

      const result = date.formatDateFromString(correctInitialParams);

      expect(result).toBe(expectedResult);
    });
    test.each([[null, ''], [undefined, ''], ['', '']])('returns empty string for Nil and empty string', (input, expected) => {
      const result = date.formatDateFromString(input);

      expect(result).toBe(expected);
    });
  });

  describe('getLast24Hours', () => {
    it('returns last 24 hours', () => {
      const expectedResult = {
        startDate: new Date('2017-02-13T12:51:48.000Z'),
        endDate: new Date('2017-02-14T12:51:48.000Z'),
      };
      const mockedDateNow = jest.fn(() => 1487076708000);
      Date.now = mockedDateNow;
      const result = date.getLast24Hours();

      expect(result).toMatchObject(expectedResult);
      mockedDateNow.mockRestore();
    });
  });
});
