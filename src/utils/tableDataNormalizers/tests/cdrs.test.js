import * as cdrs from '../cdrs';
import { CDR_ENTRY_FROM_API, CDR_ENTRY_IN_TABLE } from '@/constants';

describe('formatCdrs store helper', () => {
  it('formats cdrs data according to spec', () => {
    const correctInitialParams = [CDR_ENTRY_FROM_API];
    const expectedResult = [CDR_ENTRY_IN_TABLE];

    const result = cdrs.formatCdrs(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });

  it('formats cdrs data according to spec, substituting boolean value', () => {
    const correctInitialParams = [{ ...CDR_ENTRY_FROM_API, success: true }];
    const expectedResult = [{ ...CDR_ENTRY_IN_TABLE, success: 'Yes' }];

    const result = cdrs.formatCdrs(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });

  it('returns an empty array if no cdrs were passed', () => {
    const expectedResult = [];

    const result = cdrs.formatCdrs();
    expect(result).toMatchObject(expectedResult);
  });
});
