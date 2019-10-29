import { jsonApi } from '../../api';
import { RESOURCES } from '../../static/constants/api';

const state = {
  token: sessionStorage.getItem('yeti-token'),
  status: '',
};
const getters = {
  isAuthenticated: () => Boolean(state.token),
  authStatus: () => state.status,
};
const actions = {
  authRequest: async ({ commit }, { login, password }) => {
    const { data: { jwt } } = await jsonApi.createResource(RESOURCES.AUTH, {
      login, password,
    });

    jsonApi.setToken(jwt);
    commit('authSuccess', jwt);
    sessionStorage.setItem('yeti-token', jwt);
  },
  localAuth: ({ commit }) => {
    const jwt = sessionStorage.getItem('yeti-token');

    jsonApi.setToken(jwt);
    if (jwt) {
      commit('authSuccess', jwt);
    } else {
      commit('logout');
    }
  },
  logout: ({ commit }) =>
    new Promise((resolve) => {
      commit('logout');
      sessionStorage.removeItem('yeti-token');
      resolve();
    }),
};
const mutations = {
  authSuccess: (currentState, token) => {
    currentState.status = 'success';
    currentState.token = token; // @todo probably not needed anymore
  },
  logout: (currentState) => {
    currentState.token = '';
    currentState.status = 'unauthorized';
  },
  setError: (currentState, res) => {
    currentState.error = res;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
