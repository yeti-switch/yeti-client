import store from 'store';
import { UI_STATE } from '@/constants';
import { mutations, actions } from '../ui-state';

describe('ui-state', () => {
  describe('mutations', () => {
    it(`${UI_STATE.MUTATIONS.SET_NAV_STATE} sets navCollapsed property`, () => {
      const state = {};
      const collapsed = true;

      mutations[UI_STATE.MUTATIONS.SET_NAV_STATE](state, collapsed);

      expect(state.navCollapsed).toBe(collapsed);
    });
  });

  describe('actions', () => {
    it(`${UI_STATE.ACTIONS.SET_NAV_STATE} calls commit with proper value`, () => {
      const commit = jest.fn();
      const value = false;
      const spy = jest.spyOn(store, 'set');

      actions[UI_STATE.ACTIONS.SET_NAV_STATE]({ commit }, value);

      expect(commit).toHaveBeenCalledWith(UI_STATE.MUTATIONS.SET_NAV_STATE, value);
      expect(spy).toHaveBeenCalledWith('yetiNavCollapsed', value);

      jest.resetAllMocks();
    });
  });
});
