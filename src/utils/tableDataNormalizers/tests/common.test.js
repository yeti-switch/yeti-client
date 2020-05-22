import * as common from '../common';

describe('prettifyRateValue store helper', () => {
  it('formats rates field if it is null', () => {
    const result = common.prettifyNullValue(null);
    expect(result).toBe(' - ');
  });

  it('do not format rates field if it has correct value', () => {
    const result = common.prettifyNullValue(1);
    expect(result).toBe(1);
  });
});
