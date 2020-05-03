import * as rates from '../rates';

describe('formatRates store helper', () => {
  it('formats rates data according to spec', () => {
    const correctInitialParams = [{
      prefix: '380',
      'initial-rate': '0.11',
      'initial-interval': 1,
      'next-rate': '0.11',
      'next-interval': 1,
      'connect-fee': '0.0',
      'reject-calls': false,
      'valid-from': '2018-12-19T17:14:00.000Z',
      'valid-till': '2023-12-19T17:14:00.000Z',
      'network-prefix-id': 996,
    }];
    const expectedResult = [{
      prefix: '380',
      'connect-fee': '0.0',
      'reject-calls': false,
      'valid-from': '2018-12-19 18:14:00',
      'valid-till': '2023-12-19 18:14:00',
      'network-prefix-id': 996,
      'billing-intervals': '1/1',
      rate: '0.11/0.11',

      'initial-rate': '0.11',
      'initial-interval': 1,
      'next-rate': '0.11',
      'next-interval': 1,
    }];

    const result = rates.formatRates(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });
});
