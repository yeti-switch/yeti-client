import Accounts from '../../api/Accounts'

const state = {
  accounts: {},
  error: null,
  requestPending: false,
  accountFilter: {}
}
const getters = {
  accounts: state => state.accounts,
  isRequestPending: state => state.requestPending,
  accountsFilter: state => state.accountsFilter
}

const actions = {
  getAccounts: async ({ commit, rootState }, page) => {
    commit('setRequestPending', true)
    const accounts = await Accounts.getAccounts(
      rootState.auth.token,
      state.accountFilter,
      page
    )
    commit('setAccounts', accounts)
    commit('setRequestPending', false)
  },
  setAccountFilter: ({ commit, rootState }, filter) => {
    if (filter) {
      commit('saveAccountsFilter', filter)
    }
  }
}
const mutations = {
  setAccounts: (state, accounts) => {
    state.accounts = accounts
  },
  setRequestPending: (state, isPending) => {
    state.requestPending = isPending
  },
  saveAccountsFilter: (state, filter) => {
    state.accountFilter = filter
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
