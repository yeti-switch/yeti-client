import { jsonApi } from '../../api';
import { RESOURCES, AUTH } from '../../constants';


const state = {
  token: sessionStorage.getItem('yeti-token'),
  status: '',
};
const getters = {
  isAuthenticated: () => Boolean(state.token),
  authStatus: () => state.status,
};
const actions = {
  [AUTH.ACTIONS.AUTH_REQUEST]: async ({ commit }, { login, password }) => {
    const { data: { jwt } } = await jsonApi.createResource(RESOURCES.AUTH, {
      login, password,
    });

    jsonApi.setToken(jwt);
    commit(AUTH.MUTATIONS.AUTH_SUCCESS, jwt);
    sessionStorage.setItem('yeti-token', jwt);
  },
  [AUTH.ACTIONS.LOCAL_AUTH]: ({ commit }) => {
    const jwt = sessionStorage.getItem('yeti-token');

    jsonApi.setToken(jwt);
    if (jwt) {
      commit(AUTH.MUTATIONS.AUTH_SUCCESS, jwt);
    } else {
      commit(AUTH.MUTATIONS.LOGOUT);
    }
  },
  [AUTH.ACTIONS.LOGOUT]: ({ commit }) =>
    new Promise((resolve) => {
      commit(AUTH.MUTATIONS.LOGOUT);
      sessionStorage.removeItem('yeti-token');
      resolve();
    }),
};
const mutations = {
  [AUTH.MUTATIONS.AUTH_SUCCESS]: (currentState, token) => {
    currentState.status = 'success';
    currentState.token = token; // @todo probably not needed anymore
  },
  [AUTH.MUTATIONS.LOGOUT]: (currentState) => {
    currentState.token = '';
    currentState.status = 'unauthorized';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
