import { NETWORK_SERVICE } from '@/constants';

const state = {
  requestsPending: 0,
};

const getters = {
  requestIsPending: (currentState) => Boolean(currentState.requestsPending),
};

export const actions = {
  [NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE]: ({ commit }, pendingStatus) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, pendingStatus);
  },
};

export const mutations = {
  [NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE]: (currentState, requestIsPending) => {
    // Here we're simply sum active network requests. It can be dangerous
    const quantator = requestIsPending ? 1 : -1;
    const { requestsPending } = currentState;

    // Potential bug here. Probably it should say requestsPending >= 0
    currentState.requestsPending = requestsPending > 0 ? requestsPending + quantator : 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
