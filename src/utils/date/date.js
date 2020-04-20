import { format, subDays } from 'date-fns';
import { isNil } from 'lodash';

export const formatTableDate = (dateStr) => (!isNil(dateStr) && dateStr.length
  ? format(new Date(Date.parse(dateStr)), 'yyyy-MM-dd HH:mm:ss')
  : '');


export const pickerDateToStatisticsFilter = (dateStr) => format(dateStr, 'yyyy-MM-dd HH:mm:ss');

export const formatPickerDate = (dateStr) =>
  (dateStr ? format(dateStr, 'yyyy-MM-dd HH:mm') : dateStr);

export const getLast24Hours = () => ({
  startDate: subDays(new Date(Date.now()), 1),
  endDate: new Date(Date.now()),
});
