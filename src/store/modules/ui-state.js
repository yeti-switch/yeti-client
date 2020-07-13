import store from 'store';
import { UI_STATE } from '@/constants';

const state = {
  navOpened: store.get('yetiNavCollapseOpened', true),
};

const getters = {
  navOpened: (currentState) => currentState.navOpened,
};

const actions = {
  [UI_STATE.ACTIONS.SET_NAV_STATE]: ({ commit }, value) => {
    store.set('yetiNavCollapseOpened', value);

    commit(UI_STATE.MUTATIONS.SET_NAV_STATE, value);
  },
};

const mutations = {
  [UI_STATE.ACTIONS.SET_NAV_STATE]: (currentState, navOpened) => {
    currentState.navOpened = navOpened;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
