// eslint-disable-next-line
import { jsonApi } from '../../api';
import { RESOURCES, ACTIVE_CALLS, NETWORK_SERVICE } from '../../constants';
import utils from '../../utils';

const state = {
  activeCalls: {},
  requestPending: false,
  error: null,
};
const getters = {
  activeCalls: (currentState) => currentState.activeCalls.data,
  isRequestPending: (currentState) => currentState.requestPending,
};
const actions = {
  [ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS]: async ({ commit, rootState }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const { startDate, endDate } = rootState.timeRangeFilter.timeFilterValue;
    const fromTime = utils.pickerDateToActiveCallsFilter(startDate);
    const toTime = utils.pickerDateToActiveCallsFilter(endDate);

    const activeCalls = await jsonApi.createResource(RESOURCES.ACTIVE_CALLS, {
      'from-time': fromTime,
      'to-time': toTime,
      account: {
        id: '33fefc7a-0e61-11ea-95b4-525400e13b18',
      },
    });

    if (activeCalls.error) {
      commit(ACTIVE_CALLS.MUTATIONS.SET_ERROR, activeCalls.error);
    } else {
      commit(ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS, activeCalls);
    }
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
};
const mutations = {
  [ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS]: (currentState, activeCalls) => {
    currentState.activeCalls = activeCalls;
  },
  [ACTIVE_CALLS.MUTATIONS.SET_REQUEST_PENDING]: (currentState, isPending) => {
    currentState.requestPending = isPending;
  },
  [ACTIVE_CALLS.MUTATIONS.SET_ERROR]: (currentState, error) => {
    currentState.error = error;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
