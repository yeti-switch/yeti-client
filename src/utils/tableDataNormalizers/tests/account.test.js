import * as account from '../account';
import { EXLUDED_RESPONSE_FIELDS } from '@/pages/Accounts/constants';

describe('formatAccount store helper', () => {
  it('formats account data according to spec', () => {
    const correctInitialParams = {
      id: 'mockId',
      type: 'anyType',
      links: {
        self: 'https://self-link.example.com',
      },
      name: 'test user',
      balance: '0.0',
      'min-balance': '99.0',
      'max-balance': '100.0',
      'destination-rate-limit': '1',
      'origination-capacity': '2',
      'termination-capacity': '3',
      'total-capacity': '4',
    };
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
