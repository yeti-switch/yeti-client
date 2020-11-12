import { CDRS, RESOURCES } from '@/constants';
import { mutations, actions } from '../cdrs';

jest.mock('@/utils', () => ({
  wrapWithAsyncRequestStatus: jest.fn((commit, callback) => callback()),
}));

const mockFindAllResources = jest.fn(() => true);
const CDRS_SAMPLE = [{ id: 'first' }, { id: 'second' }];

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      findAllResources: mockFindAllResources,
    };
  },
}));

describe('cdrs', () => {
  describe('mutations', () => {
    it(`${CDRS.MUTATIONS.SET_CDRS} sets few cdrs to a store`, () => {
      const state = {};

      mutations[CDRS.MUTATIONS.SET_CDRS](state, CDRS_SAMPLE);

      expect(state.cdrs).toBe(CDRS_SAMPLE);
    });

    it(`${CDRS.MUTATIONS.SAVE_CDRS_FILTER} sets cdrs filter value`, () => {
      const state = {};
      const filter = { filterKey: 'filterValue' };

      mutations[CDRS.MUTATIONS.SAVE_CDRS_FILTER](state, filter);

      expect(state.cdrFilter).toBe(filter);
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

    it(`${CDRS.ACTIONS.SET_CDRS_FILTER} calls appropriate mutation if filter value is present`, () => {
      const filter = { filterKey: 'filterValue' };

      actions[CDRS.ACTIONS.SET_CDRS_FILTER]({ commit }, filter);

      expect(commit).toHaveBeenCalledWith(CDRS.MUTATIONS.SAVE_CDRS_FILTER, filter);
    });

    it(`${CDRS.ACTIONS.SET_CDRS_FILTER} doesn't call appropriate mutation if filter value is empty`, () => {
      expect(commit).toHaveBeenCalledTimes(0);
      actions[CDRS.ACTIONS.SET_CDRS_FILTER]({ commit }, null);
      expect(commit).toHaveBeenCalledTimes(0);
    });

    it(`${CDRS.ACTIONS.GET_CDRS} fetches and sets cdrs records`, async () => {
      const page = '1';
      const id = '1';
      const startDate = 'startDate';
      const endDate = 'endDate';
      const rootGetters = { activeAccount: { id } };
      const rootState = { timeRangeFilter: { timeFilterValue: { startDate, endDate } } };
      mockFindAllResources.mockReturnValue(CDRS_SAMPLE);

      await actions[CDRS.ACTIONS.GET_CDRS]({ commit, rootGetters, rootState }, page);

      expect(mockFindAllResources).toHaveBeenCalledWith(
        RESOURCES.CDR, {
          filter: {
            accountIdEq: id,
            timeStartGteq: startDate,
            timeStartLteq: endDate,
          },
          page,
        },
      );
      expect(commit).toHaveBeenCalledWith(CDRS.MUTATIONS.SET_CDRS, CDRS_SAMPLE);
    });
  });
});
