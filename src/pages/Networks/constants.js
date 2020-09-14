export const TABLE_HEADERS_ANT = [
  {
    key: 'name',
    dataIndex: 'name',
    width: 300,
    visibleInOverview: true,
    customRender(name, row) {
      return <a
      router-link
      href={`#/network-details/${row.id}`}
    >
      {name}
    </a>;
    },
  },
  {
    key: 'network-type',
    dataIndex: 'network-type',
    width: 300,
    visibleInOverview: true,
  },
  {
    key: 'id',
    dataIndex: 'id',
    width: 300,
    visibleInOverview: true,
  },
];
