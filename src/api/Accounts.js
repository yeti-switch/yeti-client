import config from '../config'
import JsonApi from 'devour-client'

const jsonApi = new JsonApi({apiUrl: `${config.yeti.apiBaseUrl}/api/rest/customer/v1`});

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
  getAccounts: async function (token) {
    jsonApi.headers['Authorization'] = `Bearer ${token}`
    return await jsonApi.findAll('account');
  }
}
