import { ACCOUNT_DETAILS, COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';
import * as account from '../account';

describe('formatAccount store helper', () => {
  it('formats account data according to spec', () => {
    const correctInitialParams = ACCOUNT_DETAILS;
    const expectedResult = [
      {
        Id: 'mockId',
        Name: 'test user',
        Balance: '0.0',
        'Min balance': '99.0',
        'Max balance': '100.0',
        'Destination rate limit': '1',
        'Origination capacity': '2',
        'Termination capacity': '3',
        'Total capacity': '4',
      },
    ];

    const result = account.formatAccount(COMMON_TABLE_ENTITY_EXCLUDED_FIELDS, correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });
});
