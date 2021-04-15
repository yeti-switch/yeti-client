import { formatDateFromString } from '@/utils/date/date';

export const formatInvoices = (invoices = []) => invoices.map((item, index) => {
  item.period = `${formatDateFromString(item['start-date'])} - ${formatDateFromString(item['end-date'])}`;
  item['first-call-at'] = formatDateFromString(item['first-call-at']);
  item['first-successful-call-at'] = formatDateFromString(item['first-successful-call-at']);
  item['last-call-at'] = formatDateFromString(item['last-call-at']);
  item['last-successful-call-at'] = formatDateFromString(item['last-successful-call-at']);
  item.key = index;
  return item;
});
