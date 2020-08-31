import * as common from '../common';

describe('prettifyRateValue store helper', () => {
  it('formats rates field if it is null', () => {
    const result = common.prettifyNullValue(null);
    expect(result).toBe(' - ');
  });

  it('do not format rates field if it has correct value', () => {
    const result = common.prettifyNullValue(1);
    expect(result).toBe(1);
  });
});

describe('applyLocaleHeaders store helper', () => {
  it('transforms header values to a proper format', () => {
    const inputData = [
      ['name', 'Some network name'],
      ['uuid', '12345'],
      ['network-type', 'Current'],
    ];

    const localeHeaders = {
      name: 'Name',
      'network-type': 'Network Type',
      uuid: 'Uuid',
    };

    const expectedResult = [
      { key: 'Name', value: 'Some network name' },
      { key: 'Uuid', value: '12345' },
      { key: 'Network Type', value: 'Current' },
    ];

    const result = common.applyLocaleHeaders(localeHeaders)(inputData);
    expect(result).toStrictEqual(expectedResult);
  });
});
