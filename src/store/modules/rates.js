import Rates from '../../api/Rates'

const state = {
  rates: {},
  rateFilter: {}
}
const getters = {
  rates: state => state.rates,
  rateFilter: state => state.rateFilter
}
const actions = {
  getRates: async ({ commit, rootState }, page) => {
    const rates = await Rates.getRates(rootState.auth.token, state.rateFilter, page)
    commit('setRates', rates)
  },
  setRateFilter: ({commit, rootState}, filter) => {
    if (filter) {
      commit('saveFilter', filter)
    }
  }
}
const mutations = {
  setRates: (state, rates) => {
    state.rates = rates
  },
  saveFilter: (state, filter) => {
    state.rateFilter = filter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
