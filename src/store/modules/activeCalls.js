// eslint-disable-next-line
import { jsonApi } from '../../api';
import { RESOURCES, ACTIVE_CALLS, NETWORK_SERVICE } from '../../constants';
import utils from '../../utils';

const state = {
  activeCalls: {},
};
const getters = {
  activeCalls: (currentState) => currentState.activeCalls.data,
};
const actions = {
  [ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS]: async ({ commit, rootGetters, rootState }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
    const { id } = rootGetters.activeAccount;
    const fromTime = utils.pickerDateToActiveCallsFilter(startDate);
    const toTime = utils.pickerDateToActiveCallsFilter(endDate);


    const activeCalls = await jsonApi.createResource(RESOURCES.ACTIVE_CALLS, {
      'from-time': fromTime,
      'to-time': toTime,
      account: {
        id,
      },
    });

    commit(ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS, activeCalls);

    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
};
const mutations = {
  [ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS]: (currentState, activeCalls) => {
    currentState.activeCalls = activeCalls;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
