import * as cdrs from '../cdrs';
import { CDR_ENTRY_FROM_API, CDR_ENTRY_IN_TABLE } from '@/constants';

describe('formatCdrs store helper', () => {
  it('formats cdrs data according to spec', () => {
    const correctInitialParams = [CDR_ENTRY_FROM_API];
    const expectedResult = [CDR_ENTRY_IN_TABLE];

    const result = cdrs.formatCdrs(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });
});
