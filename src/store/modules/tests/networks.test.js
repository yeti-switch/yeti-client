import { CDRS, NETWORKS, RESOURCES } from '@/constants';
import { mutations, actions } from '../networks';

jest.mock('@/utils', () => ({
  wrapWithAsyncRequestStatus: jest.fn((commit, callback) => callback()),
}));

const mockFindAllResources = jest.fn(() => true);
const NETWORKS_SAMPLE = [{ id: 'first' }, { id: 'second' }];

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      findAllResources: mockFindAllResources,
    };
  },
}));

describe('networks', () => {
  describe('mutations', () => {
    it(`${NETWORKS.MUTATIONS.SET_NETWORKS} sets few networks to a store`, () => {
      const state = {};

      mutations[NETWORKS.MUTATIONS.SET_NETWORKS](state, NETWORKS_SAMPLE);

      expect(state.networks).toBe(NETWORKS_SAMPLE);
    });

    it(`${NETWORKS.MUTATIONS.SAVE_NETWORKS_FILTER} sets networks filter value`, () => {
      const state = {};
      const filter = { filterKey: 'filterValue' };

      mutations[NETWORKS.MUTATIONS.SAVE_NETWORKS_FILTER](state, filter);

      expect(state.networksFilter).toBe(filter);
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

    it(`${NETWORKS.ACTIONS.SET_NETWORKS_FILTER} sets filter and dispatches fetch`, () => {
      const filter = { filterKey: 'filterValue' };
      const dispatch = jest.fn();

      actions[NETWORKS.ACTIONS.SET_NETWORKS_FILTER]({ commit, dispatch }, filter);

      expect(dispatch).toHaveBeenCalledWith(NETWORKS.ACTIONS.GET_NETWORKS, 1);
      expect(commit).toHaveBeenCalledWith(NETWORKS.MUTATIONS.SAVE_NETWORKS_FILTER, filter);
    });

    it(`${NETWORKS.ACTIONS.GET_NETWORKS} fetches networks without enabled filter`, async () => {
      const page = '1';
      const state = { };
      mockFindAllResources.mockReturnValue(NETWORKS_SAMPLE);

      await actions[NETWORKS.ACTIONS.GET_NETWORKS]({ commit, state }, page);

      expect(mockFindAllResources).toHaveBeenCalledWith(
        RESOURCES.NETWORKS, { page, include: 'network-type' },
      );
      expect(commit).toHaveBeenCalledWith(NETWORKS.MUTATIONS.SET_NETWORKS, NETWORKS_SAMPLE);
    });

    it(`${NETWORKS.ACTIONS.GET_NETWORKS} fetches networks with enabled filter`, async () => {
      const page = '1';
      const filterParams = { filterKey: 'filterValue' };
      const state = { networksFilter: filterParams };
      mockFindAllResources.mockReturnValue(NETWORKS_SAMPLE);

      await actions[NETWORKS.ACTIONS.GET_NETWORKS]({ commit, state }, page);

      expect(mockFindAllResources).toHaveBeenCalledWith(
        RESOURCES.NETWORKS, { page, include: 'network-type', filter: { nameCont: filterParams } },
      );
      expect(commit).toHaveBeenCalledWith(NETWORKS.MUTATIONS.SET_NETWORKS, NETWORKS_SAMPLE);
    });
  });
});
