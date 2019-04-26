import Cdrs from '../../api/Cdrs'

const state = {
  cdrs: {},
  requestPending: false,
  error: null,
};
const getters = {
  cdrs: state => state.cdrs,
  isRequestPending: state => state.requestPending
};
const actions = {
  getCdrs: async ({commit, rootState}, filter) => {
    commit('setRequestPending', true)
    const cdrs = await Cdrs.getCdrs(rootState.auth.token, filter);
    if (cdrs.error) {
      commit('setError', cdrs.error)
    } else {
      commit('setCdrs', cdrs)
    }
    commit('setRequestPending', false)
  }
};
const mutations = {
  setCdrs: (state, cdrs) => {
    state.cdrs = cdrs
  },
  setRequestPending: (state, isPending) => {
    state.requestPending = isPending
  },
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