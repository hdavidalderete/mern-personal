import { ENV } from "../utils";

export class Auth {
  baseApi = ENV.BASE_API;

  async register({ email, password }) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw result;
      return result;
    } catch (error) {}
  }

  async login({ email, password }) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.LOGIN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {}
  }

  async refreshsAccessToken(token) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.REFRESH_TOKEN}`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  setAccessToken(token) {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  }

  getAccessToken() {
    return localStorage.getItem(ENV.JWT.ACCESS);
  }

  setRefreshsToken(refresh) {
    localStorage.setItem(ENV.JWT.REFRESH, refresh);
  }

  getRefreshToken() {
    return localStorage.getItem(ENV.JWT.REFRESH);
  }

  removeTokens() {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  }
}
