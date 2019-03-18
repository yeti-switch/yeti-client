export default {
  getRates: async function (token) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    const response = await fetch ('https://demo.yeti-switch.org/api/rest/customer/v1/rates', {
      method: 'get',
      headers: headers
    });

    return await response.json();
  }
}