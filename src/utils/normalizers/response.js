import { formatTableDate } from '../date/date';

export const normalizeCdrs = (cdrs = []) =>
  cdrs.map((item) => {
    item['time-start'] = formatTableDate(item['time-start']);
    item['time-connect'] = formatTableDate(item['time-connect']);
    item['time-end'] = formatTableDate(item['time-end']);
    return item;
  });

export const normalizeRates = (rates = []) =>
  rates.map((item) => ({
    ...item,
    'valid-from': formatTableDate(item['valid-from']),
    'valid-till': formatTableDate(item['valid-till']),
  }));
