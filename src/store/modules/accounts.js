import api from '@/api';
import {
  ACCOUNTS, RESOURCES, SPARSE_FIELDS,
} from '@/constants';
import utils from '@/utils';

const state = {
  accounts: {
    data: [],
  },
  currentAccountDetails: {},
  activeAccountId: '',
};

const getters = {
  accounts: (currentState) => (currentState.accounts),
  currentAccountDetails: (currentState) => currentState.currentAccountDetails.data,

  activeAccount: (currentState) => (currentState.activeAccountId
    ? currentState.accounts.find((account) => account.id === currentState.activeAccountId)
    : currentState.accounts[0]),
};

export const actions = {
  [ACCOUNTS.ACTIONS.GET_ACCOUNTS]: ({ commit, dispatch, state: localState }) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const { data } = await api.apiInstance.findAllResources(RESOURCES.ACCOUNTS, {
        fields: { [RESOURCES.ACCOUNTS]: SPARSE_FIELDS[RESOURCES.ACCOUNTS] },
      });

      if (localState.activeAccountId === '') {
        commit(ACCOUNTS.MUTATIONS.SET_ACCOUNTS, data);
        dispatch(ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS);
      } else {
        commit(ACCOUNTS.MUTATIONS.SET_ACCOUNTS, data);
      }
    }),
  [ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS]: ({ commit, getters: localGetters }) =>
    utils.wrapWithAsyncRequestStatus(commit, async () => {
      const account = await api.apiInstance
        .findOneResource(RESOURCES.ACCOUNTS, localGetters.activeAccount.id);

      commit(ACCOUNTS.MUTATIONS.SET_ACCOUNT_DETAILS, account);
    }),
  [ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]: ({ commit }, id) => {
    commit(ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID, id);
  },
};

export const mutations = {
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
