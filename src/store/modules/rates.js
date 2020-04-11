import { jsonApi } from '../../api';
import { RESOURCES, RATES, NETWORK_SERVICE } from '../../constants';


const state = {
  rates: {},
};
const getters = {
  rates: (currentState) => ({
    items: currentState.rates.data,
    meta: currentState.rates.meta,
  }),
};
const actions = {
  [RATES.ACTIONS.GET_RATES]: async ({ commit }, page) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const rates = await jsonApi.findAllResources(RESOURCES.RATE, {
      filter: state.rateFilter,
      page,
    });

    commit(RATES.MUTATIONS.SET_RATES, rates);

    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
};
const mutations = {
  [RATES.MUTATIONS.SET_RATES]: (currentState, rates) => {
    currentState.rates = rates;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
