import { formatDateFromString } from '../date/date';
import { prettifyNullValue } from './common';

export const formatCdrs = (cdrs = []) =>
  cdrs.map((item) => {
    item['time-start'] = formatDateFromString(item['time-start']);
    item['time-connect'] = formatDateFromString(item['time-connect']);
    item['time-end'] = formatDateFromString(item['time-end']);
    item.success = item.success ? 'Yes' : 'No';
    item['disconnect-full-info'] = `${item['lega-disconnect-code']} ${item['lega-disconnect-reason']}`;
    item.rate = `${prettifyNullValue(item['destination-initial-rate'])}/${prettifyNullValue(item['destination-next-rate'])}`;
    item['billing-intervals'] = `${prettifyNullValue(item['destination-initial-interval'])}/${prettifyNullValue(item['destination-next-interval'])}`;
    item['originator-address'] = `${item['auth-orig-ip']}:${item['auth-orig-port']}`;

    return item;
  });
