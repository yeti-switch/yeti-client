import { RATES, RESOURCES } from '@/constants';
import { mutations, actions } from '../rates';

jest.mock('@/utils', () => ({
  wrapWithAsyncRequestStatus: jest.fn((commit, callback) => callback()),
}));

const mockFindAllResources = jest.fn(() => true);
const RATES_SAMPLE = [{ id: 'first' }, { id: 'second' }];

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      findAllResources: mockFindAllResources,
    };
  },
}));

describe('rates', () => {
  describe('mutations', () => {
    it(`${RATES.MUTATIONS.SET_RATES} sets few rates to a store`, () => {
      const state = {};

      mutations[RATES.MUTATIONS.SET_RATES](state, RATES_SAMPLE);

      expect(state.rates).toBe(RATES_SAMPLE);
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

    it(`${RATES.ACTIONS.GET_RATES} fetches rates`, async () => {
      const page = '1';
      mockFindAllResources.mockReturnValue(RATES_SAMPLE);

      await actions[RATES.ACTIONS.GET_RATES]({ commit }, page);

      expect(mockFindAllResources).toHaveBeenCalledWith(
        RESOURCES.RATE, { page },
      );
      expect(commit).toHaveBeenCalledWith(RATES.MUTATIONS.SET_RATES, RATES_SAMPLE);
    });
  });
});
