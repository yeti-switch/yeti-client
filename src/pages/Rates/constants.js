export const TABLE_HEADERS_ANT = [
  {
    key: 'prefix',
    dataIndex: 'prefix',
    title: 'Prefix',
    width: 200,
  },
  {
    key: 'reject-calls',
    dataIndex: 'reject-calls',
    title: 'Reject calls',
    width: 200,
    scopedSlots: {
      customRender: 'badge',
    },
  },
  {
    key: 'billing-interval',
    dataIndex: 'billing-interval',
    title: 'Billing interval',
    width: 200,
  },
  {
    key: 'rate',
    dataIndex: 'rate',
    title: 'Rate',
    width: 200,
  },
  {
    key: 'connect-fee',
    dataIndex: 'connect-fee',
    title: 'Connect fee',
    width: 200,
  },
  {
    key: 'network-prefix',
    dataIndex: 'network-prefix',
    title: 'Network prefix',
    width: 200,
  },
  {
    key: 'valid-from',
    dataIndex: 'valid-from',
    title: 'Valid from',
    width: 200,
  },
  {
    key: 'valid-till',
    dataIndex: 'valid-till',
    title: 'Valid till',
    width: 200,
  },
];
