import Accounts from '../../api/Accounts'

const state = {
  accounts: {},
  error: null,
  requestPending: false,
};
const getters = {
  accounts: state => state.accounts,
  isRequestPending: state => state.requestPending
};

const actions = {
  getAccounts: async ({commit, rootState}) => {
    commit('setRequestPending', true)
    const accounts = await Accounts.getAccounts(rootState.auth.token)
    console.log('AAAAA', accounts);
    if (accounts && accounts.error) {
      commit('setError', accounts.error)
    } else {
      commit('setAccounts', accounts)
    }
    commit('setRequestPending', false)
  }
};
const mutations = {
  setAccounts: (state, accounts) => {
    state.accounts = accounts
  },
  setRequestPending: (state, isPending) => {
    state.requestPending = isPending
  },
  setError: (state,error) => {
    state.error = error
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}