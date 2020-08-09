import { ACCOUNT_DETAILS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import * as account from '../account';

describe('formatAccount store helper', () => {
  it('formats account data according to spec', () => {
    const correctInitialParams = ACCOUNT_DETAILS;
    const expectedResult = [
      { key: 'Id', value: 'mockId' },
      { key: 'Name', value: 'test user' },
      { key: 'Balance', value: '0.0' },
      { key: 'Min balance', value: '99.0' },
      { key: 'Max balance', value: '100.0' },
      { key: 'Destination rate limit', value: '1' },
      { key: 'Origination capacity', value: '2' },
      { key: 'Termination capacity', value: '3' },
      { key: 'Total capacity', value: '4' },
    ];

    const result = account.formatAccount(COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });
});
