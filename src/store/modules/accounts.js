import Accounts from '../../api/Accounts'

const state = {
    accounts: {},
};
const getters = {
    accounts: state => state.accounts
};

const actions = {
    getAccounts: async ({commit, rootState}) => {
        const accounts = await Accounts.getAccounts(rootState.auth.token)
        commit('setAccounts', accounts)
    }
};
const mutations = {
    setAccounts: (state, accounts) => {
        state.accounts = accounts
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}