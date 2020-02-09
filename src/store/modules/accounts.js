// eslint-disable-next-line
import { jsonApi } from '../../api';
import { ACCOUNTS, RESOURCES, NETWORK_SERVICE } from '../../constants';

const state = {
  accounts: {
    data: [],
  },
  account: {},
  error: null,
  activeAccountId: '',
};
const getters = {
  accounts: (currentState) => ({
    items: currentState.accounts.data, meta: currentState.accounts.meta,
  }),
  account: (currentState) => currentState.account.data,

  activeAccount: (currentState) => (currentState.activeAccountId
    ? currentState.accounts.data.find((account) => account.id === currentState.activeAccountId)
    : currentState.accounts.data[0]),
};

const actions = {
  [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: async ({ commit }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });


    const accounts = await jsonApi.findAllResources(RESOURCES.ACCOUNTS);

    commit(ACCOUNTS.MUTATIONS.SET_ACCOUNTS, accounts);


    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
  [ACCOUNTS.ACTIONS.GET_ACCOUNT]: async ({ commit, getters: localGetters }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const account = await jsonApi
      .findOneResource(RESOURCES.ACCOUNTS, localGetters.activeAccount.id);


    commit(ACCOUNTS.MUTATIONS.SET_ACCOUNT, account);
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
  [ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]: ({ commit }, id) => {
    commit(ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID, id);
  },
};
const mutations = {
  [ACCOUNTS.MUTATIONS.SET_ACCOUNTS]: (currentState, accounts) => {
    currentState.accounts = accounts;
  },
  [ACCOUNTS.MUTATIONS.SET_ACCOUNT]: (currentState, account) => {
    currentState.account = account;
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
