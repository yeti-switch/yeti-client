import { formatDateFromString } from '../date/date';

export const formatRates = (rates = []) =>
  rates.map((item) => {
    item['valid-from'] = formatDateFromString(item['valid-from']);
    item['valid-till'] = formatDateFromString(item['valid-till']);

    item['billing-intervals'] = `${item['initial-interval']}/${
      item['next-interval']
    }`;

    item.rate = `${item['initial-rate']}/${item['next-rate']}`;

    return item;
  });
