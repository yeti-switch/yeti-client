// eslint-disable-next-line
import { jsonApi } from '../../api';
import {
  ACCOUNTS, RESOURCES, NETWORK_SERVICE, SPARSE_FIELDS,
} from '../../constants';

const state = {
  accounts: {
    data: [],
  },
  currentAccountDetails: {},
  error: null,
  activeAccountId: '',
};
const getters = {
  accounts: (currentState) => ({
    items: currentState.accounts.data, meta: currentState.accounts.meta,
  }),
  currentAccountDetails: (currentState) => currentState.currentAccountDetails.data,

  activeAccount: (currentState) => (currentState.activeAccountId
    ? currentState.accounts.data.find((account) => account.id === currentState.activeAccountId)
    : currentState.accounts.data[0]),
};

const actions = {
  [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: async ({ commit }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const accounts = await jsonApi.findAllResources(RESOURCES.ACCOUNTS, {
      fields: { [RESOURCES.ACCOUNTS]: SPARSE_FIELDS[RESOURCES.ACCOUNTS] },
    });

    commit(ACCOUNTS.MUTATIONS.SET_ACCOUNTS, accounts);
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  },
  [ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS]: async ({ commit, getters: localGetters }) => {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });

    const account = await jsonApi
      .findOneResource(RESOURCES.ACCOUNTS, localGetters.activeAccount.id);

    commit(ACCOUNTS.MUTATIONS.SET_ACCOUNT_DETAILS, account);
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
  [ACCOUNTS.MUTATIONS.SET_ACCOUNT_DETAILS]: (currentState, currentAccountDetails) => {
    currentState.currentAccountDetails = currentAccountDetails;
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
