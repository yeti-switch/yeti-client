export default {
    getToken: async function (login, password) {
        const headers = new Headers();
        const data = {
            auth: {
                login: login,
                password: password
            }
        };
        headers.append('Content-Type', 'application/json')

        const response = await fetch ('https://demo.yeti-switch.org/api/rest/customer/v1/auth', {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        });

        if(response.status !== 201) {
            throw new Error('Authorization error');
        }

        return response.json()
    }
}
