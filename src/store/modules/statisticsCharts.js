import api from '@/api';
import { RESOURCES, STATISTICS } from '@/constants';
import utils from '@/utils';

const state = {
  activeCalls: null,
  originatedCps: null,
};
const getters = {
  activeCalls: (currentState) => currentState.activeCalls,
  originatedCps: (currentState) => currentState.originatedCps,
};
export const actions = {
  [STATISTICS.ACTIONS.GET_STATISTICS]: ({ commit, rootGetters, rootState }) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
      const { id } = rootGetters.activeAccount;
      const requestParams = utils.constructChartDataRequest({ id, startDate, endDate });

      const activeCallsPromise = api.apiInstance.createResource(
        RESOURCES.ACTIVE_CALLS, requestParams,
      );
      const originatedCpsPromise = api.apiInstance.createResource(
        RESOURCES.ORIGINATED_CPS, requestParams,
      );

      await Promise.all([activeCallsPromise, originatedCpsPromise])
        .then(([activeCalls, originatedCps]) => {
          commit(STATISTICS.MUTATIONS.SET_STATISTICS, { activeCalls, originatedCps });
        });
    }),
};
export const mutations = {
  [STATISTICS.MUTATIONS.SET_STATISTICS]: (currentState, { activeCalls, originatedCps }) => {
    currentState.activeCalls = activeCalls.data;
    currentState.originatedCps = originatedCps.data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
