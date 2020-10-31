import api from '@/api';
import { RESOURCES, RATES } from '@/constants';
import utils from '@/utils';

const state = {
  rates: {},
};
const getters = {
  rates: (currentState) => ({
    items: currentState.rates.data,
    meta: currentState.rates.meta,
  }),
};
export const actions = {
  [RATES.ACTIONS.GET_RATES]: ({ commit }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const rates = await api.apiInstance.findAllResources(RESOURCES.RATE, {
        page,
      });

      commit(RATES.MUTATIONS.SET_RATES, rates);
    }),
};
export const mutations = {
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
