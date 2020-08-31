export const prettifyNullValue = (value) => (value === null ? ' - ' : value);
export const applyLocaleHeaders = (localeHeaders) => (tableInfo) => tableInfo
  .map(([key, value]) => ({ key: localeHeaders[key], value }));
