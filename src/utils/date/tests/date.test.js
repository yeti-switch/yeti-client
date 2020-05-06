import * as date from '../date';

const appendZero = (val) => (val > 9 ? val : `0${val}`);
const createTestResult = (val) => {
  const dateObj = val instanceof Date ? val : new Date(val);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const adjustedMonth = appendZero(month);
  const dates = dateObj.getDate();
  const adjustedDate = appendZero(dates);
  const hour = dateObj.getHours();
  const adjustedHour = appendZero(hour);
  const minute = dateObj.getMinutes();
  const adjustedMinute = appendZero(minute);
  const second = dateObj.getSeconds();
  const adjustedSecond = appendZero(second);

  return `${year}-${adjustedMonth}-${adjustedDate} ${adjustedHour}:${adjustedMinute}:${adjustedSecond}`;
};

describe('date helper', () => {
  describe('formatDateFromObject', () => {
    it('construct correct date string if date object is passed', () => {
      const correctInitialParams = new Date('Sat May 02 2020 14:25:05 GMT+0200');

      const expectedResult = createTestResult(correctInitialParams);

      const result = date.formatDateFromObject(correctInitialParams);

      expect(result).toBe(expectedResult);
    });
  });
  describe('formatDateFromString', () => {
    it('construct correct date string if date string is passed', () => {
      const correctInitialParams = '2020-01-20T15:01:58.957Z';

      const expectedResult = createTestResult(correctInitialParams);

      const result = date.formatDateFromString(correctInitialParams);

      expect(result).toBe(expectedResult);
    });
    test.each([[null, ''], [undefined, ''], ['', '']])('returns empty string for Nil and empty string', (input, expected) => {
      const result = date.formatDateFromString(input);

      expect(result).toBe(expected);
    });
  });
});
