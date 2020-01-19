// eslint-disable-next-line
import { jsonApi } from '../../api';
import { RESOURCES, RATES } from '../../constants';


const state = {
  rates: {},
  rateFilter: {},
};
const getters = {
  rates: (currentState) => ({
    items: currentState.rates.data,
    meta: currentState.rates.meta,
  }),
  rateFilter: (currentState) => currentState.rateFilter,
};
const actions = {
  [RATES.ACTIONS.GET_RATES]: async ({ commit }, page) => {
    const rates = await jsonApi.findAllResources(RESOURCES.RATE, {
      filter: state.rateFilter,
      page,
    });
    commit(RATES.MUTATIONS.SET_RATES, rates);
  },
  // [RATES.ACTIONS.SET_RATES_FILTER]: ({ commit }, filter) => {
  //   if (filter) {
  //     commit(RATES.MUTATIONS.SAVE_RATES_FILTER, filter);
  //   }
  // },
};
const mutations = {
  [RATES.MUTATIONS.SET_RATES]: (currentState, rates) => {
    currentState.rates = rates;
  },
  // [RATES.MUTATIONS.SAVE_RATES_FILTER]: (currentState, filter) => {
  //   currentState.rateFilter = filter;
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
