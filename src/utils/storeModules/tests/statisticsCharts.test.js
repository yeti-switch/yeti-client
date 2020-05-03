import * as statisticsCharts from '../statisticsCharts';

describe('constructChartDataRequest store helper', () => {
  it('construct correct object if all data are okay', () => {
    const correctInitialParams = {
      startDate: Date.parse('Sat May 02 2020 14:25:05 GMT+0200'),
      endDate: Date.parse('Sat May 03 2020 14:25:05 GMT+0200'),
      id: 'mockId',
    };
    const expectedResult = {
      'from-time': '2020-05-02 14:25:05',
      'to-time': '2020-05-03 14:25:05',
      account: {
        id: 'mockId',
      },
    };

    const result = statisticsCharts.constructChartDataRequest(correctInitialParams);

    expect(result).toMatchObject(expectedResult);
  });
});
