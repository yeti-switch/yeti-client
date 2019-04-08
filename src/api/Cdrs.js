import config from '../config'
import JsonApi from 'devour-client'

const jsonApi = new JsonApi({apiUrl: `${config.yeti.apiBaseUrl}/api/rest/customer/v1`});

jsonApi.define('cdr', {

})


export default {
  getCdrs: function (token) {
    jsonApi.headers['Authorization'] = `Bearer ${token}`
    return jsonApi.findAll('cdr');
  }
}
