import { jsonApi } from '@/api';
import { RESOURCES, STATISTICS, NETWORK_SERVICE } from '@/constants';
import utils from '@/utils';

const state = {
  activeCalls: {},
  originatedCps: {},
};
const getters = {
  activeCalls: (currentState) => currentState.activeCalls.data,
  originatedCps: (currentState) => currentState.originatedCps.data,
};
const actions = {
  [STATISTICS.ACTIONS.GET_STATISTICS]: ({ commit, rootGetters, rootState }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
    const { id } = rootGetters.activeAccount;
    const fromTime = utils.pickerDateToStatisticsFilter(startDate);
    const toTime = utils.pickerDateToStatisticsFilter(endDate);


    const activeCallsPromise = jsonApi.createResource(RESOURCES.ACTIVE_CALLS, {
      'from-time': fromTime,
      'to-time': toTime,
      account: {
        id,
      },
    });


    const originatedCpsPromise = jsonApi.createResource(RESOURCES.ORIGINATED_CPS, {
      'from-time': fromTime,
      'to-time': toTime,
      account: {
        id,
      },
    });

    Promise.all([activeCallsPromise, originatedCpsPromise]).then(([activeCalls, originatedCps]) => {
      commit(STATISTICS.MUTATIONS.SET_STATISTICS, { activeCalls, originatedCps });

      commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
    });
  },
};
const mutations = {
  [STATISTICS.MUTATIONS.SET_STATISTICS]: (currentState, { activeCalls, originatedCps }) => {
    currentState.activeCalls = activeCalls;
    currentState.originatedCps = originatedCps;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
