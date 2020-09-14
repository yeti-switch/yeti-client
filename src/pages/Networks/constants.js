export const TABLE_HEADERS_ANT = [
  {
    key: 'name',
    dataIndex: 'name',
    width: 300,
    showInHeader: true,
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
    showInHeader: true,
  },
  {
    key: 'id',
    dataIndex: 'id',
    width: 300,
    showInHeader: true,
  },
];
