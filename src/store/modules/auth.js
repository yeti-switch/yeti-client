import { jsonApi } from '@/api';
import { RESOURCES, AUTH } from '@/constants';

const YETI_TOKEN = 'yeti-token';

const state = {
  token: sessionStorage.getItem(YETI_TOKEN),
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
    sessionStorage.setItem(YETI_TOKEN, jwt);
  },
  [AUTH.ACTIONS.LOCAL_AUTH]: ({ commit }) => {
    const jwt = sessionStorage.getItem(YETI_TOKEN);

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
      sessionStorage.removeItem(YETI_TOKEN);
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
