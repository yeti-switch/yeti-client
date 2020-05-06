import { format, subDays } from 'date-fns';
import { isNil } from 'lodash';

const appendZero = (val) => (val > 9 ? val : `0${val}`);
export const createDateForTestResult = (val) => {
  const dateObj = val instanceof Date ? val : new Date(val);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const adjustedMonth = appendZero(month);
  const dates = dateObj.getDate();
  const adjustedDate = appendZero(dates);
  const hour = dateObj.getHours();
  const adjustedHour = appendZero(hour);
  const minute = dateObj.getMinutes();
  const adjustedMinute = appendZero(minute);
  const second = dateObj.getSeconds();
  const adjustedSecond = appendZero(second);

  return `${year}-${adjustedMonth}-${adjustedDate} ${adjustedHour}:${adjustedMinute}:${adjustedSecond}`;
};

export const formatDateFromObject = (dateStr) => format(dateStr, 'yyyy-MM-dd HH:mm:ss');

export const formatDateFromString = (dateStr) => (!isNil(dateStr) && dateStr.length
  ? formatDateFromObject(new Date(dateStr))
  : '');

export const getLast24Hours = () => ({
  startDate: subDays(new Date(Date.now()), 1),
  endDate: new Date(Date.now()),
});
