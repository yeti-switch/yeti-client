import api from '@/api';
import { RESOURCES, INVOICES } from '@/constants';
import utils from '@/utils';

const state = {
  invoices: {},
  invoicesFilter: '',
};
const getters = {
  invoices: (currentState) => ({
    items: currentState.invoices.data, meta: currentState.invoices.meta,
  }),
  invoicesFilter: (currentState) => currentState.invoicesFilter(),
};
export const actions = {
  [INVOICES.ACTIONS.GET_INVOICES]: ({ commit }, page) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const invoices = await api.apiInstance.findAllResources(RESOURCES.INVOICES, {
        page,
      });

      commit(INVOICES.MUTATIONS.SET_INVOICES, invoices);
    }),
  [INVOICES.ACTIONS.SET_INVOICES_FILTER]: ({ commit, dispatch }, filter) => {
    commit(INVOICES.MUTATIONS.SAVE_INVOICES_FILTER, filter);
    dispatch(INVOICES.ACTIONS.GET_INVOICES, 1);
  },
};
export const mutations = {
  [INVOICES.MUTATIONS.SET_INVOICES]: (currentState, invoices) => {
    currentState.invoices = invoices;
  },

  [INVOICES.MUTATIONS.SAVE_INVOICES_FILTER]: (currentState, filter) => {
    currentState.invoicesFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
