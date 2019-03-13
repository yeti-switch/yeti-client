import Authentication from '../../api/Authentication'

const state = {
    token: localStorage.getItem('yeti-token') || '',
    status: ''
}
const getters = {
    isAuthenticated: () => !!state.token,
    authStatus: () => state.status
}
const actions = {
    authRequest: async ({commit, dispatch}, { username, password }) => {
        try {
            const response = await Authentication.getToken(username, password);
            commit('authSuccess', response)
            localStorage.setItem('yeti-token', response.jwt)
        } catch (e) {
            console.log(e);
        }
    },
    logout: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit('logout')
            localStorage.removeItem('yeti-token')
            resolve()
        })
    }
}
const mutations = {
    authSuccess: (state, res) => {
        state.status = 'success'
        state.token = res.jwt
    },
    logout: (state) => {
        state.token=''
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}