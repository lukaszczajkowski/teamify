import AuthApi from "../api/AuthApi";

const tokenKey = "_token";
const userKey = "_user";

// Disclaimer: This simple auth implementation is for development purposes only.

class Auth {
    setLoggedIn = () => {};

    isLoggedIn() {
        return this._getToken() != null;
    }

    async login(loginData) {
        return await this._loginOrRegister(AuthApi.authenticate, loginData);
    }

    async register(registrationData) {
        return await this._loginOrRegister(AuthApi.register, registrationData);
    }

    logout() {
        this.setLoggedIn(false);
        this._clearToken();
        this._clearUser();
    }

    bindLoggedInStateSetter(loggedInStateSetter) {
        this.setLoggedIn = loggedInStateSetter;
    }

    getAuthorizationHeader() {
        return "Bearer "+this._getToken();
    }


    async _loginOrRegister(action, data) {
        try {
            const response = await action(data);
            this._setToken(response.data.token);
            this._setUser(response.data.user);
            this.setLoggedIn(true);
            return true;
        } catch (e) {
            console.error(e);
            
            this.setLoggedIn(false);
            return false;
        }
    }

    _getToken() {
        return window.sessionStorage.getItem(tokenKey);
    }

    _setToken(token) {
        window.sessionStorage.setItem(tokenKey, token);
    }

    _clearToken() {
        window.sessionStorage.removeItem(tokenKey);
    }

    _setUser(user) {
        const userJson = JSON.stringify(user);
        window.sessionStorage.setItem(userKey, userJson);
    }

    _clearUser() {
        window.sessionStorage.removeItem(userKey);
    }

    getUser() {
        return JSON.parse(window.sessionStorage.getItem(userKey));
    }
}


export default new Auth();