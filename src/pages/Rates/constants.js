export const TABLE_HEADERS_ANT = [
  {
    key: 'prefix',
    dataIndex: 'prefix',
    width: 200,
    visibleInOverview: true,
  },
  {
    key: 'reject-calls',
    dataIndex: 'reject-calls',
    width: 200,
    visibleInOverview: true,
    scopedSlots: {
      customRender: 'badge',
    },
  },
  {
    key: 'billing-interval',
    dataIndex: 'billing-interval',
    width: 200,
    visibleInOverview: true,
  },
  {
    key: 'rate',
    dataIndex: 'rate',
    width: 200,
    visibleInOverview: true,
  },
  {
    key: 'connect-fee',
    dataIndex: 'connect-fee',
    width: 200,
    visibleInOverview: true,
  },
  {
    key: 'network-prefix',
    dataIndex: 'network-prefix',
    width: 200,
    visibleInOverview: true,
  },
  {
    key: 'valid-from',
    dataIndex: 'valid-from',
    width: 200,
    visibleInOverview: true,
  },
  {
    key: 'valid-till',
    dataIndex: 'valid-till',
    width: 200,
    visibleInOverview: true,
  },
];
