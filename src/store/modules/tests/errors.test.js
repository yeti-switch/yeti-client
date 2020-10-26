import { mutations } from '../errors';

describe('errors', () => {
  describe('mutations', () => {
    it('setError sets error to the state', () => {
      const state = {};
      const error = new Error('Test error');

      mutations.setError(state, error);

      expect(state.error).toBe(error);
    });
  });
});
