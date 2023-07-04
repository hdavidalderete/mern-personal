import { ENV } from "../utils";

export class User {
  baseApi = ENV.BASE_API;

  async getMe(accessToken) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.USER_ME}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status === "200") throw result;
      return result;
    } catch (error) {}
  }

  async createUser(accessToken, user) {
    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        formData.append(key, user[key]);
      });
      if (user.fileAvatar) {
        formData.append("avatar", user.fileAvatar);
      }
      const url = `${this.baseApi}${ENV.API_ROUTES.ADD_USER}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw result;
      return result;
    } catch (error) {}
  }

  async updateUser(accessToken, idUser, user) {
    try {
      if (!user?.password) {
        delete user.password;
      }
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        formData.append(key, user[key]);
      });
      if (user.fileAvatar) {
        formData.append("avatar", user.fileAvatar);
      }
      const url = `${this.baseApi}${ENV.API_ROUTES.EDIT_USER}/${idUser}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {}
  }

  async deleteUser(accessToken, idUser) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.DELETE_USER}/${idUser}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {}
  }

  async getUsers(accessToken, active = undefined) {
    try {
      console.log(active);
      const url = `${this.baseApi}${ENV.API_ROUTES.GET_ALL_USERS}?active=${active}`;
      const params = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {}
  }
}
