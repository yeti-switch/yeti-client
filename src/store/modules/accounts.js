import Accounts from '../../api/Accounts'

const state = {
    accounts: {},
    requestPending: false
};
const getters = {
    accounts: state => state.accounts,
    isRequestPending: state => state.requestPending
};

const actions = {
    getAccounts: async ({commit, rootState}) => {
        commit('setRequestPending', true)
        const accounts = await Accounts.getAccounts(rootState.auth.token)
        commit('setAccounts', accounts)
        commit('setRequestPending', false)
    }
};
const mutations = {
    setAccounts: (state, accounts) => {
        state.accounts = accounts
    },
    setRequestPending: (state, status) => {
        state.requestPending = status
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}