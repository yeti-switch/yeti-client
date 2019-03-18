const state = {
  error: null,
};

const getters = {
  error: state => state.error
};

const actions = {
};

const mutations = {
  setError: (state,error) => {
    state.error = error
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}