import { NETWORK_SERVICE } from '@/constants';

export const wrapWithAsyncRequestStatus = async (commit, callback) => {
  try {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });
    await callback();
  } catch (e) {
    throw new Error(e && e[0] && e[0].title);
  } finally {
    commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
  }
};
