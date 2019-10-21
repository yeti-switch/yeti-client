export default {
  async getToken(login, password) {
    const headers = new Headers();
    const data = {
      auth: {
        login,
        password,
      },
    };
    headers.append('Content-Type', 'application/json');

    const response = await fetch(
      `${CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1/auth`,
      {
        method: 'post',
        body: JSON.stringify(data),
        headers,
      },
    );

    if (response.status !== 201) {
      throw new Error('Authorization error');
    }

    return response.json();
  },
};
