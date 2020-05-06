export const ACCOUNT_DETAILS = {
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

export const RATE_ENTRY_FROM_API = {
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
};

export const RATE_ENTRY_IN_TABLE = {
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
};
