import { NETWORK_SERVICE } from '@/constants';

export const wrapWithAsyncRequestStatus = async (commit, callback) => {
  commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, true, { root: true });
  // eslint-disable-next-line no-console
  await callback().catch((e) => { console.error(e[0].title); });
  commit(NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE, false, { root: true });
};
