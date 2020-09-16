import { RATE_ENTRY_FROM_API, RATE_ENTRY_IN_TABLE } from '@/constants';

import * as rates from '../rates';

describe('formatRates store helper', () => {
  it('formats rates data according to spec', () => {
    const correctInitialParams = [RATE_ENTRY_FROM_API];
    const expectedResult = [RATE_ENTRY_IN_TABLE];

    const result = rates.formatRates(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });

  it('returns an empty array if no rates were passed', () => {
    const expectedResult = [];

    const result = rates.formatRates();
    expect(result).toMatchObject(expectedResult);
  });
});
