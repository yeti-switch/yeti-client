import * as commonStoreHelpers from '../common';

describe('wrapWithAsyncRequestStatus', () => {
  it('should call commits and callback in approproate order', async () => {
    const callback = jest.fn();
    const commit = jest.fn();

    const caller = async () => commonStoreHelpers.wrapWithAsyncRequestStatus(commit, callback);

    await caller();

    expect(callback).toBeCalled();
  });
});

