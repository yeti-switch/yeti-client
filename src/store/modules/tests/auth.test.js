import { AUTH, RESOURCES } from '@/constants';
import { mutations, actions } from '../auth';

const YETI_TOKEN = 'yeti-token';
const JWT_TOKEN = 'newToken';
const mockCreateResource = jest.fn();
const mockSetToken = jest.fn();

jest.mock('@/api', () => ({
  get apiInstance() {
    return {
      createResource: mockCreateResource,
      setToken: mockSetToken,
    };
  },
}));

describe('auth', () => {
  let storageGetItemSpy;
  let storageRemoveItem;
  let storageSetItemSpy;
  beforeAll(() => {
    storageGetItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    storageRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');
    storageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');
  });
  afterEach(() => {
    mockSetToken.mockReset();
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('mutations', () => {
    it(`${AUTH.MUTATIONS.AUTH_SUCCESS} sets auth op result + token`, () => {
      const state = {};
      const status = 'success';
      const token = 'myToken';

      mutations[AUTH.MUTATIONS.AUTH_SUCCESS](state, token);

      expect(state.token).toBe(token);
      expect(state.status).toBe(status);
    });

    it(`${AUTH.MUTATIONS.LOGOUT} logs user out`, () => {
      const state = {};
      const status = 'unauthorized';
      const token = '';

      mutations[AUTH.MUTATIONS.LOGOUT](state);

      expect(state.token).toBe(token);
      expect(state.status).toBe(status);
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

    it(`${AUTH.ACTIONS.AUTH_REQUEST} sends proper auth request`, async () => {
      mockCreateResource.mockImplementation(() => ({ data: { jwt: JWT_TOKEN } }));

      await actions[AUTH.ACTIONS.AUTH_REQUEST]({ commit }, {});

      expect(mockCreateResource).toHaveBeenCalledWith(RESOURCES.AUTH, {});
      expect(mockSetToken).toHaveBeenCalledWith(JWT_TOKEN);
      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.AUTH_SUCCESS, JWT_TOKEN);
      expect(storageSetItemSpy).toHaveBeenCalledWith(YETI_TOKEN, JWT_TOKEN);
    });

    it(`${AUTH.ACTIONS.LOCAL_AUTH} properly performs local auth if jwt is present`, async () => {
      storageGetItemSpy.mockReturnValue(JWT_TOKEN);

      await actions[AUTH.ACTIONS.LOCAL_AUTH]({ commit });

      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.AUTH_SUCCESS, JWT_TOKEN);
      expect(mockSetToken).toHaveBeenCalledTimes(1);
      expect(mockSetToken).toHaveBeenCalledWith(JWT_TOKEN);
    });

    it(`${AUTH.ACTIONS.LOCAL_AUTH} logs user out if there's no jwt`, async () => {
      storageGetItemSpy.mockReturnValue();

      await actions[AUTH.ACTIONS.LOCAL_AUTH]({ commit });

      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.LOGOUT);
      expect(mockSetToken).toHaveBeenCalledTimes(1);
      expect(mockSetToken).toHaveBeenCalledWith(undefined);
    });

    it(`${AUTH.ACTIONS.LOGOUT} removes all needed info`, async () => {
      mockCreateResource.mockReturnValue({ name: 'John Dow', accountId: '1' });

      await actions[AUTH.ACTIONS.LOGOUT]({ commit });

      expect(storageRemoveItem).toHaveBeenCalledWith(YETI_TOKEN);
      expect(commit).toHaveBeenCalledWith(AUTH.MUTATIONS.LOGOUT);
    });
  });
});
