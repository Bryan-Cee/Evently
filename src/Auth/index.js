import auth0 from 'auth0-js';

export default class Auth {
    constructor(history){
        this.history = history;
        this.auth0 = auth0.WebAuth({
            domain: process.env.REACT_APP_AUTH0_DOMAIN,
            cliendID: process.env.REACT_APP_AUTH0_CLIEN_ID,
            redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
            responseType: "token id_token",
            scope: "openid profile email"
        })
    }
}