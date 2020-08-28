export const TABLE_HEADERS_ANT = [
  {
    key: 'name',
    dataIndex: 'name',
    title: { en: 'Name', ua: "Ім'я" },
    width: 300,
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
    title: { en: 'Type', ua: 'Тип' },
    width: 300,
  },
  {
    key: 'id',
    dataIndex: 'id',
    title: { en: 'Uuid', ua: 'Uuid' },
    width: 300,
  },
];
