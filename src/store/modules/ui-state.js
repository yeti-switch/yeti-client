import store from 'store';
import { UI_STATE } from '@/constants';

const state = {
  navCollapsed: store.get('yetiNavCollapsed', false),
};

const getters = {
  navCollapsed: (currentState) => currentState.navCollapsed,
};

const actions = {
  [UI_STATE.ACTIONS.SET_NAV_STATE]: ({ commit }, value) => {
    store.set('yetiNavCollapsed', value);

    commit(UI_STATE.MUTATIONS.SET_NAV_STATE, value);
  },
};

const mutations = {
  [UI_STATE.ACTIONS.SET_NAV_STATE]: (currentState, navCollapsed) => {
    currentState.navCollapsed = navCollapsed;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
