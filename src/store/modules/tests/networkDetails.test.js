import { NETWORKS, RESOURCES } from '@/constants';
import { mutations, actions } from '../networkDetails';

jest.mock('@/utils', () => ({
  wrapWithAsyncRequestStatus: jest.fn((commit, callback) => callback()),
}));

const mockFindOneResource = jest.fn(() => true);
const NETWORK_DETAILS_SAMPLE = { id: 'first' };

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      findOneResource: mockFindOneResource,
    };
  },
}));

describe('networkDetails', () => {
  describe('mutations', () => {
    it(`${NETWORKS.MUTATIONS.SAVE_NETWORK_DETAILS} sets info about particular network`, () => {
      const state = {};

      mutations[NETWORKS.MUTATIONS.SAVE_NETWORK_DETAILS](state, NETWORK_DETAILS_SAMPLE);

      expect(state.networkDetails).toBe(NETWORK_DETAILS_SAMPLE);
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

    it(`${NETWORKS.ACTIONS.GET_NETWORK_DETAILS} fetches details of particular network`, async () => {
      const id = '1';
      mockFindOneResource.mockReturnValue(NETWORK_DETAILS_SAMPLE);

      await actions[NETWORKS.ACTIONS.GET_NETWORK_DETAILS]({ commit }, id);

      expect(mockFindOneResource).toHaveBeenCalledWith(
        RESOURCES.NETWORKS, id, expect.anything(),
      );
      expect(commit).toHaveBeenCalledWith(
        NETWORKS.MUTATIONS.SAVE_NETWORK_DETAILS, NETWORK_DETAILS_SAMPLE,
      );
    });
  });
});
