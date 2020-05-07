import { NETWORK_SERVICE } from '@/constants';
import * as commonStoreHelpers from '../common';

describe('wrapWithAsyncRequestStatus store helper', () => {
  it('should call commits and callback in approproate order', async () => {
    const callback = jest.fn();
    const commit = jest.fn();

    const caller = async () =>
      commonStoreHelpers.wrapWithAsyncRequestStatus(commit, callback);

    await caller();

    expect(commit).toHaveBeenNthCalledWith(
      1,
      NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE,
      true,
      { root: true },
    );
    expect(commit).toHaveBeenNthCalledWith(
      2,
      NETWORK_SERVICE.MUTATIONS.SWITCH_PENDING_STATE,
      false,
      { root: true },
    );

    expect(callback).toHaveBeenCalledAfter(commit);
    expect(commit).toHaveBeenCalledBefore(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
