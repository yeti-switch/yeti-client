import { jsonApi } from '@/api';
import { RESOURCES, STATISTICS, NETWORK_SERVICE } from '@/constants';
import utils from '@/utils';

const state = {
  activeCalls: null,
  originatedCps: null,
};
const getters = {
  activeCalls: (currentState) => currentState.activeCalls,
  originatedCps: (currentState) => currentState.originatedCps,
};
const actions = {
  [STATISTICS.ACTIONS.GET_STATISTICS]: ({ commit, rootGetters, rootState }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
    const { id } = rootGetters.activeAccount;
    const requestParams = utils.constructChartDataRequest({ id, startDate, endDate });

    const activeCallsPromise = jsonApi.createResource(RESOURCES.ACTIVE_CALLS, requestParams);
    const originatedCpsPromise = jsonApi.createResource(RESOURCES.ORIGINATED_CPS, requestParams);

    Promise.all([activeCallsPromise, originatedCpsPromise]).then(([activeCalls, originatedCps]) => {
      commit(STATISTICS.MUTATIONS.SET_STATISTICS, { activeCalls, originatedCps });

      commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
    });
  },
};
const mutations = {
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
