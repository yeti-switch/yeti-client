import { COMMON_TABLE_ENTITY_EXCLUDED_FIELDS } from '@/constants';

import * as networkDetails from '../networkDetails';

describe('formatNetworkDetails store helper', () => {
  it('formats network details if they are present', () => {
    const sampleNetworkDetails = {
      links: [],
      type: 'dumbType',
      id: 'someId',
      name: 'My network',
      'network-type': {
        name: 'Mobile',
      },
    };

    const expectedResult = [
      ['name', 'My network'],
      ['network-type', 'Mobile'],
      ['uuid', 'someId'],
    ];

    const result = networkDetails.formatNetworkDetails(
      COMMON_TABLE_ENTITY_EXCLUDED_FIELDS,
    )(sampleNetworkDetails);
    expect(result).toMatchObject(expectedResult);
  });

  it('returns an empty array if no network details are passed', () => {
    const result = networkDetails.formatNetworkDetails(
      COMMON_TABLE_ENTITY_EXCLUDED_FIELDS,
    )();
    expect(result).toMatchObject([]);
  });
});
