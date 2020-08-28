export const TABLE_HEADERS_ANT = [
  {
    key: 'prefix',
    dataIndex: 'prefix',
    title: { en: 'Prefix', ua: 'Префікс' },
    width: 200,
  },
  {
    key: 'reject-calls',
    dataIndex: 'reject-calls',
    title: { en: 'Reject calls', ua: 'Відбивати виклики' },
    width: 200,
    scopedSlots: {
      customRender: 'badge',
    },
  },
  {
    key: 'billing-interval',
    dataIndex: 'billing-interval',
    title: { en: 'Billing interval', ua: 'Інтервал розрахунків' },
    width: 200,
  },
  {
    key: 'rate',
    dataIndex: 'rate',
    title: { en: 'Rate', ua: 'Тариф' },
    width: 200,
  },
  {
    key: 'connect-fee',
    dataIndex: 'connect-fee',
    title: { en: 'Connect fee', ua: "Оплата за з'єднання" },
    width: 200,
  },
  {
    key: 'network-prefix',
    dataIndex: 'network-prefix',
    title: { en: 'Network prefix', ua: 'Мережевий префікс' },
    width: 200,
  },
  {
    key: 'valid-from',
    dataIndex: 'valid-from',
    title: { en: 'Valid from', ua: 'Діє з' },
    width: 200,
  },
  {
    key: 'valid-till',
    dataIndex: 'valid-till',
    title: { en: 'Valid till', ua: 'Діє до' },
    width: 200,
  },
];
