import { jsonApi } from '../../api';
import { RESOURCES } from '../../static/constants/api';
import utils from '../../utils';

const state = {
  cdrs: {},
  requestPending: false,
  error: null,
  cdrFilter: {},
};
const getters = {
  cdrs: (currentState) => utils.normalizeCdrs(currentState.cdrs.data),
  isRequestPending: (currentState) => currentState.requestPending,
  cdrFilter: (currentState) => currentState.cdrFilter,
};
const actions = {
  getCdrs: async ({ commit }, page) => {
    commit('setRequestPending', true);
    const cdrs = await jsonApi.findAllResources(RESOURCES.CDR, {
      filter: state.cdrFilter,
      page,
    });
    if (cdrs.error) {
      commit('setError', cdrs.error);
    } else {
      commit('setCdrs', cdrs);
    }
    commit('setRequestPending', false);
  },
  setCdrFilter: ({ commit }, filter) => {
    if (filter) {
      commit('saveCdrFilter', filter);
    }
  },
};
const mutations = {
  setCdrs: (currentState, cdrs) => {
    currentState.cdrs = cdrs;
  },
  setRequestPending: (currentState, isPending) => {
    currentState.requestPending = isPending;
  },
  setError: (currentState, error) => {
    currentState.error = error;
  },
  saveCdrFilter: (currentState, filter) => {
    currentState.cdrFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
