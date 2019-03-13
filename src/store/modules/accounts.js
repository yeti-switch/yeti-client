import Accounts from '../../api/Accounts'
import { mapGetters } from 'vuex';

const state = {
    accounts: [],
};
const getters = {
};
const computed = {
    ...mapGetters[
        'accounts'
    ]
};

const actions = {
    getAccounts: async ({commit, dispatch, rootState}) => {
        const accounts = await Accounts.getAccounts(rootState.auth.token);
        commit('setAccounts', accounts)
    }
};
const mutations = {
    setAccounts: (state, accounts) => {
        state.accounts = accounts;
    }
};

export default {
    state,
    getters,
    computed,
    actions,
    mutations
}