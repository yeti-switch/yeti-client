const state = {
  error: null,
};

const getters = {
  error: (currentState) => currentState.error,
};

const actions = {};

const mutations = {
  setError: (currentState, error) => {
    currentState.error = error;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
