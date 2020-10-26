import { TIME_RANGE_FILTER } from '@/constants';
import { mutations, actions } from '../timeRangeFilter';
import utils from '@/utils';

describe('timeRangeFilter', () => {
  describe('mutations', () => {
    it(`${TIME_RANGE_FILTER.MUTATIONS.SET_VALUE} sets store value to an argument`, () => {
      const state = {};
      const value = 'new Date';

      mutations[TIME_RANGE_FILTER.MUTATIONS.SET_VALUE](state, value);

      expect(state.timeFilterValue).toBe(value);
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

    it(`${TIME_RANGE_FILTER.ACTIONS.FILTER_SET} sets filter value`, () => {
      commit = jest.fn();
      const value = 'new Date';

      actions[TIME_RANGE_FILTER.ACTIONS.FILTER_SET]({ commit }, value);

      expect(commit).toHaveBeenCalledWith(TIME_RANGE_FILTER.MUTATIONS.SET_VALUE, value);
    });

    it(`${TIME_RANGE_FILTER.ACTIONS.FILTER_RESET} sets filter value`, () => {
      commit = jest.fn();
      const value = 'current time';
      jest.spyOn(utils, 'getLast24Hours').mockReturnValue('current time');

      actions[TIME_RANGE_FILTER.ACTIONS.FILTER_RESET]({ commit });

      expect(commit).toHaveBeenCalledWith(TIME_RANGE_FILTER.MUTATIONS.SET_VALUE, value);

      jest.resetAllMocks();
    });
  });
});
