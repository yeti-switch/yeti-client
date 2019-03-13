export default {
    login (email, password, cb) {
        sendRequest(email, password, res => {
            if (res.authenticated) {
                localStorage.token = res.token
                if (cb){
                    cb(true)
                }
                this.onChange(true)
            } else {
                if (cb) {
                    cb(false)
                }
                this.onChange(false)
            }
        });
    },
    getToken () {
        return localStorage.token;
    },
    logout (cb) {
        delete localStorage.token;
    },
    loggedIn () {
        return !!localStorage.token;
    },
    onChange () {}
}

function sendRequest(email, password, cb) {  // stub for tests
    setTimeout(() => {
        if (email === 'admin@example.com' && password === '123') {
          cb({
            authenticated: true,
            token: Math.random().toString(36).substring(7)
          })
        } else {
          cb({ authenticated: false })
        }
      }, 0) 
}