import { NETWORK_SERVICE } from '@/constants';

const state = {
  requestIsPending: 0,
};

const getters = {
  requestIsPending: (currentState) => Boolean(currentState.requestIsPending),
};

const actions = {
  [NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE]: ({ commit }, pendingStatus) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, pendingStatus);
  },
};

const mutations = {
  [NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE]: (currentState, requestIsPending) => {
    // Here we're simply sum active network requests. It can be dangerous
    const quntator = requestIsPending ? 1 : -1;

    currentState.requestIsPending += quntator;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
