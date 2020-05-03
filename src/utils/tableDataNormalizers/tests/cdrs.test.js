import * as cdrs from '../cdrs';

describe('formatCdrs store helper', () => {
  it('formats cdrs data according to spec', () => {
    const correctInitialParams = [{
      'time-start': '2020-01-20T15:01:58.957Z',
      'time-connect': null,
      'time-end': '2020-01-20T15:01:58.965Z',
      duration: 0,
      success: false,
      'destination-initial-interval': 1,
      'destination-initial-rate': '0.11',
      'destination-next-interval': 1,
      'destination-next-rate': '0.11',
      'destination-fee': '0.0',
      'customer-price': '0.0',
      'src-name-in': '',
      'src-prefix-in': '1001',
      'from-domain': '193.186.15.24',
      'dst-prefix-in': '380900442038074686',
      'to-domain': '193.186.15.24',
      'ruri-domain': '193.186.15.24',
      'diversion-in': null,
      'local-tag': '8-2645F1E6-5E25C0E6000EB5F6-146FE700',
      'lega-disconnect-code': 480,
      'lega-disconnect-reason': 'Gateway not registered',
      'lega-rx-payloads': '/',
      'lega-tx-payloads': '/',
      'auth-orig-transport-protocol-id': 1,
      'auth-orig-ip': '193.186.15.24',
      'auth-orig-port': 5060,
      'lega-rx-bytes': 0,
      'lega-tx-bytes': 0,
      'lega-rx-decode-errs': 0,
      'lega-rx-no-buf-errs': 0,
      'lega-rx-parse-errs': 0,
      'src-prefix-routing': '1001',
      'dst-prefix-routing': '3800000000000000000',
      'destination-prefix': '380',
    }];
    const expectedResult = [{
      'time-start': '2020-01-20 16:01:58',
      'time-connect': '',
      'time-end': '2020-01-20 16:01:58',

      duration: 0,
      success: 'No',

      'destination-fee': '0.0',
      'customer-price': '0.0',
      'src-name-in': '',
      'src-prefix-in': '1001',
      'from-domain': '193.186.15.24',
      'dst-prefix-in': '380900442038074686',
      'to-domain': '193.186.15.24',
      'ruri-domain': '193.186.15.24',
      'diversion-in': null,
      'local-tag': '8-2645F1E6-5E25C0E6000EB5F6-146FE700',
      'disconnect-full-info': '480 Gateway not registered',
      rate: '0.11/0.11',
      'billing-intervals': '1/1',
      'originator-address': '193.186.15.24:5060',

      'lega-rx-payloads': '/',
      'lega-tx-payloads': '/',
      'auth-orig-transport-protocol-id': 1,
      'lega-rx-bytes': 0,
      'lega-tx-bytes': 0,
      'lega-rx-decode-errs': 0,
      'lega-rx-no-buf-errs': 0,
      'lega-rx-parse-errs': 0,
      'src-prefix-routing': '1001',
      'dst-prefix-routing': '3800000000000000000',
      'destination-prefix': '380',

      'lega-disconnect-code': 480,
      'lega-disconnect-reason': 'Gateway not registered',
      'destination-initial-interval': 1,
      'destination-initial-rate': '0.11',
      'destination-next-interval': 1,
      'destination-next-rate': '0.11',
      'auth-orig-ip': '193.186.15.24',
      'auth-orig-port': 5060,
    }];

    const result = cdrs.formatCdrs(correctInitialParams);
    expect(result).toMatchObject(expectedResult);
  });
});
