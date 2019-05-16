import JsonApi from 'devour-client'

const jsonApi = new JsonApi({apiUrl: `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1`});

jsonApi.define('account', {
  name: '',
  balance: '',
  minBalance: '',
  maxBalance: '',
  destinationRateLimit: '',
  originationCapacity: '',
  terminationCapacity: '',
  totalCapacity: ''
})

export default {
  getAccounts: function (token) {
    jsonApi.headers['Authorization'] = `Bearer ${token}`
    return jsonApi.findAll('account');
  }
}
