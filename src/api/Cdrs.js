import config from '../config'
import JsonApi from 'devour-client'

const jsonApi = new JsonApi({apiUrl: `${config.yeti.apiBaseUrl}/api/rest/customer/v1`});

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
  duration: '',
  success: '',
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
  getCdrs: function (token) {
    jsonApi.headers['Authorization'] = `Bearer ${token}`
    return jsonApi.findAll('cdr');
  }
}
