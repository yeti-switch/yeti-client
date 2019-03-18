import Rates from '../../api/Rates'

const state = {
  rates: {}
};
const getters = {
  rates: state => state.rates
};
const actions = {
  getRates: async ({commit, rootState}) => {
    const rates = await Rates.getRates(rootState.auth.token);
    commit('setRates', rates)
  }
};
const mutations = {
  setRates: (state, rates) => {
    state.rates = rates
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}