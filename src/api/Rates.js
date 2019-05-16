import JsonApi from 'devour-client'

const jsonApi = new JsonApi({apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`});

jsonApi.define('rate', {
  prefix: '',
  initialRate: '',
  initialInterval: '',
  nextRate: '',
  nextInterval: '',
  connectFee: '',
  rejectCalls: '',
  validFrom: '',
  validTill: '',
  networkPrefixId: '',
})

export default {
  getRates: function (token) {
    jsonApi.headers['Authorization'] = `Bearer ${token}`
    return jsonApi.findAll('rate');
  }
}