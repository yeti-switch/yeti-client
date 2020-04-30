import { pickerDateToStatisticsFilter } from '../date/date';

export const constructChartDataRequest = ({ startDate, endDate, id }) => ({
  'from-time': pickerDateToStatisticsFilter(startDate),
  'to-time': pickerDateToStatisticsFilter(endDate),
  account: {
    id,
  },
});
