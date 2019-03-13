function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export default {
    getCdrs: function (token) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        return fetch ('https://demo.yeti-switch.org/api/rest/customer/v1/cdrs', {
            method: 'get',
            mode: 'no-cors',
            headers: headers
        })
        .then(handleErrors)
        .then(res => {
            console.log(res);
        });
    },
    getCdrById: function (token, cdrId) {
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${token}`);
        return fetch (`https://demo.yeti-switch.org/api/rest/customer/v1/cdrs/${id}`, {
            method: 'get',
            mode: 'no-cors',
            headers: headers
        })
        .then(handleErrors)
        .then(res => {
            console.log(res);
        });
    }
}
