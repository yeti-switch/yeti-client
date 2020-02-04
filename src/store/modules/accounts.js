// eslint-disable-next-line
import { jsonApi } from '../../api';
import { ACCOUNTS, RESOURCES } from '../../constants';

const state = {
  accounts: {
    data: [],
  },
  error: null,
  requestPending: false,
  activeAccountId: '',
};
const getters = {
  accounts: (currentState) => ({
    items: currentState.accounts.data, meta: currentState.accounts.meta,
  }),
  isRequestPending: (currentState) => currentState.requestPending,
  activeAccount: (currentState) => (currentState.activeAccountId
    ? currentState.accounts.data.find((account) => account.id === currentState.activeAccountId)
    : currentState.accounts.data[0]),
};

const actions = {
  [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: async ({ commit }, page) => {
    commit(ACCOUNTS.MUTATIONS.SET_REQUEST_PENDING, true);
    const accounts = await jsonApi.findAllResources(RESOURCES.ACCOUNT, {
      page,
    });
    commit(ACCOUNTS.MUTATIONS.SET_ACCOUNTS, accounts);
    commit(ACCOUNTS.MUTATIONS.SET_REQUEST_PENDING, false);
  },
  [ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]: ({ commit }, id) => {
    commit(ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID, id);
  },
};
const mutations = {
  [ACCOUNTS.MUTATIONS.SET_ACCOUNTS]: (currentState, accounts) => {
    currentState.accounts = accounts;
  },
  [ACCOUNTS.MUTATIONS.SET_REQUEST_PENDING]: (currentState, isPending) => {
    currentState.requestPending = isPending;
  },
  [ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID]: (currentState, id) => {
    currentState.activeAccountId = id;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
