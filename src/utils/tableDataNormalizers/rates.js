import { formatDateFromString } from '../date/date';
import { prettifyNullValue } from './common';

export const formatRates = (rates = []) =>
  rates.map((item, index) => {
    item['valid-from'] = formatDateFromString(item['valid-from']);
    item['valid-till'] = formatDateFromString(item['valid-till']);

    item['billing-interval'] = `${item['initial-interval']}/${
      item['next-interval']
    }`;

    item.rate = `${prettifyNullValue(item['initial-rate'])}/${prettifyNullValue(item['next-rate'])}`;
    item.key = index;
    item['reject-calls'] = item['reject-calls'].toString();

    return item;
  });
