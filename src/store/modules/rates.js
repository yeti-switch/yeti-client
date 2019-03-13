import Rates from '../../api/Rates'

const state = {};
const getters = {
    token: () => state.token
};
const actions = {
    getRates: async ({commit, dispatch}, token) => {
        const rates = await Rates.getRates(token);
    }
};
const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations
}