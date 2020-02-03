// eslint-disable-next-line
import { jsonApi } from '../../api';
import { RESOURCES, ACTIVE_CALLS } from '../../constants';

const state = {
  activeCalls: {},
  requestPending: false,
  error: null,
};
const getters = {
  activeCalls: (currentState) => ({
    items: currentState.activeCalls.data, meta: currentState.activeCalls.meta,
  }),
  isRequestPending: (currentState) => currentState.requestPending,
};
const actions = {
  [ACTIVE_CALLS.ACTIONS.GET_ACTIVE_CALLS]: async ({ commit }) => {
    commit(ACTIVE_CALLS.MUTATIONS.SET_REQUEST_PENDING, true);

    const activeCalls = await jsonApi.createResource(RESOURCES.ACTIVE_CALLS, {
      'from-time': '2019-01-01 00:00:00',
      'to-time': '2020-01-20 00:00:00',
      account: {
        id: '33fefc7a-0e61-11ea-95b4-525400e13b18',
      },
    });

    if (activeCalls.error) {
      commit(ACTIVE_CALLS.MUTATIONS.SET_ERROR, activeCalls.error);
    } else {
      commit(ACTIVE_CALLS.MUTATIONS.SET_ACTIVE_CALLS, activeCalls);
    }
    commit(ACTIVE_CALLS.MUTATIONS.SET_REQUEST_PENDING, false);
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
