import { EXLUDED_RESPONSE_FIELDS } from '@/pages/Accounts/constants';
import { ACCOUNT_DETAILS } from '@/constants';
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

    const result = account.formatAccount(correctInitialParams, EXLUDED_RESPONSE_FIELDS);
    expect(result).toMatchObject(expectedResult);
  });
});
