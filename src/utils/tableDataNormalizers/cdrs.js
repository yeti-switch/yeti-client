import { formatTableDate } from '../date/date';

export const formatCdrs = (cdrs = []) =>
  cdrs.map((item) => {
    item['time-start'] = formatTableDate(item['time-start']);
    item['time-connect'] = formatTableDate(item['time-connect']);
    item['time-end'] = formatTableDate(item['time-end']);
    item.success = item.success ? 'Yes' : 'No';

    return item;
  });

export const colorCdrsTable = (cdrs = []) =>
  cdrs.map((item) => {
    item._cellVariants = {};

    if (item.success === 'No') {
      item._cellVariants.success = 'danger';
    }

    return item;
  });
