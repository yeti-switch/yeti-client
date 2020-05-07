import * as statisticsCharts from '../statisticsCharts';
import { createDateForTestResult } from '../../date/date';

describe('constructChartDataRequest store helper', () => {
  it('construct correct object if all data are okay', () => {
    const correctInitialParams = {
      startDate: Date.parse('Sat May 02 2020 14:25:05 GMT+0200'),
      endDate: Date.parse('Sat May 03 2020 14:25:05 GMT+0200'),
      id: 'mockId',
    };
    const expectedResult = {
      'from-time': createDateForTestResult(correctInitialParams.startDate),
      'to-time': createDateForTestResult(correctInitialParams.endDate),
      account: {
        id: 'mockId',
      },
    };

    const result = statisticsCharts.constructChartDataRequest(correctInitialParams);

    expect(result).toMatchObject(expectedResult);
  });
});
