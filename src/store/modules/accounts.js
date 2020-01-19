// eslint-disable-next-line
import { jsonApi } from '../../api';
import { ACCOUNTS, RESOURCES } from '../../constants';

const state = {
  accounts: {},
  error: null,
  requestPending: false,
  accountFilter: {},
};
const getters = {
  accounts: (currentState) => ({
    items: currentState.accounts.data, meta: currentState.accounts.meta,
  }),
  isRequestPending: (currentState) => currentState.requestPending,
  accountsFilter: (currentState) => currentState.accountsFilter,
};

const actions = {
  [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: async ({ commit }, page) => {
    commit(ACCOUNTS.MUTATIONS.SET_REQUEST_PENDING, true);
    const accounts = await jsonApi.findAllResources(RESOURCES.ACCOUNT, {
      filter: state.cdrFilter,
      page,
    });
    commit(ACCOUNTS.MUTATIONS.SET_ACCOUNTS, accounts);
    commit(ACCOUNTS.MUTATIONS.SET_REQUEST_PENDING, false);
  },
  // [ACCOUNTS.ACTIONS.SET_ACCOUNTS_FILTER]: ({ commit }, filter) => {
  //   if (filter) {
  //     commit(ACCOUNTS.MUTATIONS.SAVE_ACCOUNTS_FILTER, filter);
  //   }
  // },
};
const mutations = {
  [ACCOUNTS.MUTATIONS.SET_ACCOUNTS]: (currentState, accounts) => {
    currentState.accounts = accounts;
  },
  [ACCOUNTS.MUTATIONS.SET_REQUEST_PENDING]: (currentState, isPending) => {
    currentState.requestPending = isPending;
  },
  // [ACCOUNTS.MUTATIONS.SAVE_ACCOUNTS_FILTER]: (currentState, filter) => {
  //   currentState.accountFilter = filter;
  // },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
