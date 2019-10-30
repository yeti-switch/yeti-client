import { jsonApi } from '../../api';
import { RESOURCES } from '../../static/constants/api';
import utils from '../../utils';

const state = {
  rates: {},
  rateFilter: {},
};
const getters = {
  rates: (currentState) => utils.normalizeRates(currentState.rates.data),
  rateFilter: (currentState) => currentState.rateFilter,
};
const actions = {
  getRates: async ({ commit }, page) => {
    const rates = await jsonApi.findAllResources(RESOURCES.RATE, {
      filter: state.rateFilter,
      page,
    });
    commit('setRates', rates);
  },
  setRateFilter: ({ commit }, filter) => {
    if (filter) {
      commit('saveRateFilter', filter);
    }
  },
};
const mutations = {
  setRates: (currentState, rates) => {
    currentState.rates = rates;
  },
  saveRateFilter: (currentState, filter) => {
    currentState.rateFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
