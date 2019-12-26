import { formatTableDate } from '../date/date';

// eslint-disable-next-line
export const formatRates = (rates = []) =>
  rates.map((item) => {
    item['valid-from'] = formatTableDate(item['valid-from']);
    item['valid-till'] = formatTableDate(item['valid-till']);

    return item;
  });
