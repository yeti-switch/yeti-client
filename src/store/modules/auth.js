import Authentication from '../../api/Authentication'
import { jsonApi } from '../../api'

const state = {
  token: '',
  status: ''
}
const getters = {
  isAuthenticated: () => !!state.token,
  authStatus: () => state.status
}
const actions = {
  authRequest: async ({ commit }, { username, password }) => {
    const { jwt } = await Authentication.getToken(username, password)

    jsonApi.setToken(jwt)
    commit('authSuccess', jwt)
    sessionStorage.setItem('yeti-token', jwt)
  },
  localAuth: function ({ commit }) {
    const jwt = sessionStorage.getItem('yeti-token')

    jsonApi.setToken(jwt)
    if (jwt) {
      commit('authSuccess', jwt)
    } else {
      commit('logout')
    }
  },
  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit('logout')
      sessionStorage.removeItem('yeti-token')
      resolve()
    })
  }
}
const mutations = {
  authSuccess: (state, token) => {
    state.status = 'success'
    state.token = token // @todo probably not needed anymore
  },
  logout: state => {
    state.token = ''
    state.status = 'unauthorized'
  },
  setError: (state, res) => {
    state.error = res
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
