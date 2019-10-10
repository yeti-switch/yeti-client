import Cdrs from '../../api/Cdrs'

const state = {
  cdrs: {},
  requestPending: false,
  error: null,
  cdrFilter: {}
}
const getters = {
  cdrs: state => state.cdrs,
  isRequestPending: state => state.requestPending,
  cdrFilter: state => state.cdrFilter
}
const actions = {
  getCdrs: async ({ commit, rootState }, page) => {
    commit('setRequestPending', true)
    const cdrs = await Cdrs.getCdrs(
      rootState.auth.token,
      state.cdrFilter,
      page
    )
    if (cdrs.error) {
      commit('setError', cdrs.error)
    } else {
      commit('setCdrs', cdrs)
    }
    commit('setRequestPending', false)
  },
  setCdrFilter: ({ commit, rootState }, filter) => {
    if (filter) {
      commit('saveCdrFilter', filter)
    }
  }
}
const mutations = {
  setCdrs: (state, cdrs) => {
    state.cdrs = cdrs
  },
  setRequestPending: (state, isPending) => {
    state.requestPending = isPending
  },
  setError: (state, error) => {
    state.error = error
  },
  saveCdrFilter: (state, filter) => {
    state.cdrFilter = filter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
