import { formatDateFromString } from '../date/date';

export const formatCdrs = (cdrs = []) =>
  cdrs.map((item) => {
    item['time-start'] = formatDateFromString(item['time-start']);
    item['time-connect'] = formatDateFromString(item['time-connect']);
    item['time-end'] = formatDateFromString(item['time-end']);
    item.success = item.success ? 'Yes' : 'No';
    item['disconnect-full-info'] = `${item['lega-disconnect-code']} ${item['lega-disconnect-reason']}`;
    item.rate = `${item['destination-initial-rate']}/${item['destination-next-rate']}`;
    item['billing-intervals'] = `${item['destination-initial-interval']}/${item['destination-next-interval']}`;
    item['originator-address'] = `${item['auth-orig-ip']}:${item['auth-orig-port']}`;

    return item;
  });
