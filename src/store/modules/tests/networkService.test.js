import { NETWORK_SERVICE } from '@/constants';
import { mutations, actions } from '../networkServices';

describe('networkServices', () => {
  describe('mutations', () => {
    it(`${NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE} correctly determines a number of pending requests`, () => {
      const state = { requestsPending: 1 };

      mutations[NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE](state, true);

      expect(state.requestsPending).toBe(2);
      mutations[NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE](state, false);
      expect(state.requestsPending).toBe(1);
      mutations[NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE](state, false);
      expect(state.requestsPending).toBe(0);
      mutations[NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE](state, false);
      expect(state.requestsPending).toBe(0);
    });
  });

  describe('actions', () => {
    let commit;
    beforeEach(() => {
      commit = jest.fn();
    });
    afterEach(() => {
      commit = null;
    });

    it(`${NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE} sets filter value`, () => {
      commit = jest.fn();
      const value = false;

      actions[NETWORK_SERVICE.ACTIONS.SWITCH_PENDING_STATE]({ commit }, value);

      expect(commit).toHaveBeenCalledWith(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, value);
    });
  });
});
