import { RESOURCES, STATISTICS } from '@/constants';
import { mutations, actions } from '../statisticsCharts';

const mockCreateResource = jest.fn(() => true);
const mockConstructChartDataRequest = jest.fn(() => true);
const ACTIVE_CALLS_SAMPLE = [{ activeCallId: 'first' }, { activeCallId: 'second' }];
const ORIGINATED_CPS_SAMPLE = [{ cpsRecordId: 'first' }, { cpsRecordId: 'second' }];

// TODO make global mock of this function
jest.mock('@/utils', () => ({
  wrapWithAsyncRequestStatus: jest.fn((commit, callback) => callback()),
  constructChartDataRequest(args) {
    return mockConstructChartDataRequest(args);
  },
}));

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      createResource: mockCreateResource,
    };
  },
}));

describe('statisticsCharts', () => {
  describe('mutations', () => {
    it(`${STATISTICS.MUTATIONS.SET_STATISTICS} sets activeCalls and originatedCps statistics`, () => {
      const state = {};

      mutations[STATISTICS.MUTATIONS.SET_STATISTICS](state, {
        activeCalls: { data: ACTIVE_CALLS_SAMPLE }, originatedCps: { data: ORIGINATED_CPS_SAMPLE },
      });

      expect(state.activeCalls).toBe(ACTIVE_CALLS_SAMPLE);
      expect(state.originatedCps).toBe(ORIGINATED_CPS_SAMPLE);
    });
  });

  describe('actions', () => {
    let commit;
    beforeEach(() => {
      commit = jest.fn();
    });
    afterEach(() => {
      commit = null;
    });

    it(`${STATISTICS.ACTIONS.GET_STATISTICS} fetches statistics info`, async () => {
      const activeAccountId = '1';
      const startDate = 'startDate';
      const endDate = 'endDate';
      const rootGetters = { activeAccount: { id: activeAccountId } };
      const rootState = { timeRangeFilter: { timeFilterValue: { startDate, endDate } } };
      const requestParams = 'universalRequestParam';
      mockCreateResource
        .mockReturnValueOnce({ data: ACTIVE_CALLS_SAMPLE })
        .mockReturnValueOnce({ data: ORIGINATED_CPS_SAMPLE });
      mockConstructChartDataRequest.mockReturnValue(requestParams);

      await actions[STATISTICS.ACTIONS.GET_STATISTICS]({ commit, rootGetters, rootState });

      expect(mockCreateResource).toHaveBeenCalledWith(RESOURCES.ORIGINATED_CPS, requestParams);
      expect(mockCreateResource).toHaveBeenCalledWith(RESOURCES.ACTIVE_CALLS, requestParams);
      expect(mockConstructChartDataRequest).toHaveBeenCalledWith({
        id: activeAccountId, startDate, endDate,
      });
      expect(commit).toHaveBeenCalledWith(
        STATISTICS.MUTATIONS.SET_STATISTICS, {
          activeCalls: { data: ACTIVE_CALLS_SAMPLE },
          originatedCps: { data: ORIGINATED_CPS_SAMPLE },
        },
      );
    });
  });
});
