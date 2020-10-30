import { ACCOUNTS } from '@/constants';
import { mutations, actions } from '../accounts';

jest.mock('@/utils', () => ({
  wrapWithAsyncRequestStatus: jest.fn((commit, callback) => callback()),
}));

const mockFindOneResource = jest.fn(() => true);

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      findOneResource: mockFindOneResource,
    };
  },
}));

describe('accounts', () => {
  describe('mutations', () => {
    it(`${ACCOUNTS.MUTATIONS.SET_ACCOUNTS} sets few accounts to a store`, () => {
      const state = {};
      const value = [{ accountId: 'first' }, { accountId: 'second' }];

      mutations[ACCOUNTS.MUTATIONS.SET_ACCOUNTS](state, value);

      expect(state.accounts).toBe(value);
    });

    it(`${ACCOUNTS.MUTATIONS.SET_ACCOUNT_DETAILS} sets current account details`, () => {
      const state = {};
      const value = { name: 'John Dow', accountId: '1' };

      mutations[ACCOUNTS.MUTATIONS.SET_ACCOUNT_DETAILS](state, value);

      expect(state.currentAccountDetails).toBe(value);
    });

    it(`${ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID} sets active account id`, () => {
      const state = {};
      const value = 'active_id';

      mutations[ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID](state, value);

      expect(state.activeAccountId).toBe(value);
    });
  });

  describe('actions', () => {
    let commit;
    beforeEach(() => {
      commit = jest.fn();
      jest.resetModules();
    });
    afterEach(() => {
      commit = null;
    });

    it(`${ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID} sets active account id`, () => {
      commit = jest.fn();
      const value = 'accountId';

      actions[ACCOUNTS.ACTIONS.SET_CHOSEN_ACCOUNT_ID]({ commit }, value);

      expect(commit).toHaveBeenCalledWith(ACCOUNTS.MUTATIONS.SET_CHOSEN_ACCOUNT_ID, value);
    });

    it(`${ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS} fetches and sets chosen account details`, async () => {
      commit = jest.fn();
      const id = '1';
      const getters = { activeAccount: { id } };
      mockFindOneResource.mockReturnValue({ name: 'John Dow', accountId: '1' });

      await actions[ACCOUNTS.ACTIONS.GET_ACCOUNT_DETAILS]({ commit, getters });

      expect(commit).toHaveBeenCalledWith(ACCOUNTS.MUTATIONS.SET_ACCOUNT_DETAILS, { name: 'John Dow', accountId: '1' });

      jest.resetAllMocks();
    });
  });
});
