import { NETWORK_SERVICE } from '../../constants';


const state = {
  requestIsPending: false,
};

const getters = {
  requestIsPending: (currentState) => currentState.requestIsPending,
};

const actions = {};

const mutations = {
  [NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE]: (currentState, requestIsPending) => {
    currentState.requestIsPending = requestIsPending;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
