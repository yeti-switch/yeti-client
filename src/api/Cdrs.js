import JsonApi from 'devour-client'

const jsonApi = new JsonApi({ apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1` })

jsonApi.define('cdr', {
  timeStart: '',
  timeConnect: '',
  timeEnd: '',
  duration: '',
  success: '',
  destinationInitialInterval: '',
  destinationInitialRate: '',
  destinationNextInterval: '',
  destinationNextRate: '',
  destinationFee: '',
  customerPrice: '',
  srcNameIn: '',
  srcPrefixIn: '',
  fromDomain: '',
  dstPrefixIn: '',
  toDomain: '',
  ruriDomain: '',
  diversionIn: '',
  localTag: '',
  legaDisconnectCode: '',
  legaDisconnectReason: '',
  legaRxPayloads: '',
  legaTxPayloads: '',
  authOrigTransportProtocolId: '',
  authOrigIp: '',
  authOrigPort: '',
  legaRxBytes: '',
  legaTxBytes: '',
  legaRxDecodeErrs: '',
  legaRxNoBufErrs: '',
  legaRxParseErrs: '',
  srcPrefixRouting: '',
  dstPrefixRouting: '',
  destinationPrefix: '',
  authOrigTransportProtocol: ''
})

jsonApi.define('authOrigTransportProtocol', {
  authOrigTransportProtocol: ''
})

export default {
  getCdrs: function (token, filter, pageNumber) {
    jsonApi.headers['Authorization'] = `Bearer ${token}`
    return jsonApi.findAll('cdr', { filter: filter, page: { size: 50, number: pageNumber } })
  }
}
