export const TABLE_HEADERS_ANT = [
  {
    key: 'has-pdf',
    dataIndex: 'has-pdf',
    width: 100,
    visibleInOverview: true,
    customRender(name, row) {
      return <a
        download
        disabled={!name}
        v-auth-href
        href={`${row.links.self}/download`}
      >
        <a-icon type="download" />
      </a>;
    },
  },
  {
    key: 'reference',
    dataIndex: 'reference',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'period',
    dataIndex: 'period',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'id',
    dataIndex: 'id',
    width: 300,
    visibleInOverview: false,
  },
  {
    key: 'amount',
    dataIndex: 'amount',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'billing-duration',
    dataIndex: 'billing-duration',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'calls-count',
    dataIndex: 'calls-count',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'calls-duration',
    dataIndex: 'calls-duration',
    width: 300,
    visibleInOverview: false,
  },
  {
    key: 'first-call-at',
    dataIndex: 'first-call-at',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'first-successful-call-at',
    dataIndex: 'first-successful-call-at',
    width: 300,
    visibleInOverview: false,
  },
  {
    key: 'last-call-at',
    dataIndex: 'last-call-at',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'last-successful-call-at',
    dataIndex: 'last-successful-call-at',
    width: 300,
    visibleInOverview: false,
  },
  {
    key: 'successful-calls-count',
    dataIndex: 'successful-calls-count',
    width: 300,
    visibleInOverview: false,
  },
];
