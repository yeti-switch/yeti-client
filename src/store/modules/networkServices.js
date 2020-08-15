import { NETWORK_SERVICE } from '@/constants';

const state = {
  requestsPending: 0,
};

const getters = {
  requestIsPending: (currentState) => Boolean(currentState.requestsPending),
};

const actions = {
  [NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE]: ({ commit }, pendingStatus) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, pendingStatus);
  },
};

const mutations = {
  [NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE]: (currentState, requestIsPending) => {
    // Here we're simply sum active network requests. It can be dangerous
    const quantator = requestIsPending ? 1 : -1;
    const { requestsPending } = currentState;

    currentState.requestsPending = requestsPending > 0 ? requestsPending + quantator : 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
