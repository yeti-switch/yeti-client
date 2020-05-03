import { format, subDays } from 'date-fns';
import { isNil } from 'lodash';

export const formatDateFromObject = (dateStr) => format(dateStr, 'yyyy-MM-dd HH:mm:ss');

export const formatDateFromString = (dateStr) => (!isNil(dateStr) && dateStr.length
  ? formatDateFromObject(new Date(Date.parse(dateStr)))
  : '');

export const getLast24Hours = () => ({
  startDate: subDays(new Date(Date.now()), 1),
  endDate: new Date(Date.now()),
});
