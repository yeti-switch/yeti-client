import { NETWORK_SERVICE } from '@/constants';
import * as commonStoreHelpers from '../common';

describe('wrapWithAsyncRequestStatus store helper', () => {
  it('should call commits and callback in appropriate order', async () => {
    const callback = jest.fn(() => Promise.resolve());
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

  it('should log an error if callback throws ir', async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    const callback = jest.fn(() => Promise.reject([new Error('Custom error')]));
    const commit = jest.fn();
    const spy = jest.spyOn(global.console, 'error');

    const caller = async () =>
      commonStoreHelpers.wrapWithAsyncRequestStatus(commit, callback);

    await caller();

    expect(callback).toHaveBeenCalledAfter(commit);

    expect(callback).toHaveBeenCalledTimes(1);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
