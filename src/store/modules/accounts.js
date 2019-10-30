import { jsonApi } from '../../api';
import { RESOURCES } from '../../static/constants/api';

const state = {
  accounts: {},
  error: null,
  requestPending: false,
  accountFilter: {},
};
const getters = {
  accounts: (currentState) => currentState.accounts,
  isRequestPending: (currentState) => currentState.requestPending,
  accountsFilter: (currentState) => currentState.accountsFilter,
};

const actions = {
  getAccounts: async ({ commit }, page) => {
    commit('setRequestPending', true);
    const accounts = await jsonApi.findAllResources(RESOURCES.ACCOUNT, {
      filter: state.cdrFilter,
      page,
    });
    commit('setAccounts', accounts);
    commit('setRequestPending', false);
  },
  setAccountFilter: ({ commit }, filter) => {
    if (filter) {
      commit('saveAccountsFilter', filter);
    }
  },
};
const mutations = {
  setAccounts: (currentState, accounts) => {
    currentState.accounts = accounts;
  },
  setRequestPending: (currentState, isPending) => {
    currentState.requestPending = isPending;
  },
  saveAccountsFilter: (currentState, filter) => {
    currentState.accountFilter = filter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
