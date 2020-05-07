import { NETWORK_SERVICE } from '@/constants';

export const wrapWithAsyncRequestStatus = async (commit, callback) => {
  commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });
  await callback();
  commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
};
