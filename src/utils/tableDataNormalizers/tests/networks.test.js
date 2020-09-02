import * as networks from '../networks';

describe('networks store helper', () => {
  it('formats networks if they are present', () => {
    const sampleNetworks = [{
      name: 'My network1',
      'network-type': {
        name: 'Mobile1',
      },
    }, {
      name: 'My network2',
      'network-type': {
        name: 'Mobile2',
      },
    }];

    const expectedResult = [
      {
        name: 'My network1',
        'network-type': 'Mobile1',
        key: 0,
      }, {
        name: 'My network2',
        'network-type': 'Mobile2',
        key: 1,
      },
    ];

    const result = networks.formatNetworks(sampleNetworks);
    expect(result).toMatchObject(expectedResult);
  });

  it('returns an empty array if no networks are passed', () => {
    const result = networks.formatNetworks();
    expect(result).toMatchObject([]);
  });
});
