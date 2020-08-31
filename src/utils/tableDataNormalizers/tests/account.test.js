import { ACCOUNT_DETAILS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import * as account from '../account';

describe('formatAccount store helper', () => {
  it('formats account data according to spec', () => {
    const correctInitialParams = ACCOUNT_DETAILS;
    const expectedResult = [
      ['id', 'mockId'],
      ['name', 'test user'],
      ['balance', '0.0'],
      ['min-balance', '99.0'],
      ['max-balance', '100.0'],
      ['destination-rate-limit', '1'],
      ['origination-capacity', '2'],
      ['termination-capacity', '3'],
      ['total-capacity', '4'],
    ];

    const result = account.formatAccount(COMMON_TABLE_ENTITY_EXCLUDED_FIELDS)(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });
});
