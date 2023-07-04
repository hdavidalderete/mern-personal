import { ENV } from "../utils";

export class Menu {
  baseApi = ENV.BASE_API;

  async getMenus(active = undefined) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.GET_MENUS}?active=${active}`;
      const response = await fetch(url);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {}
  }

  async createMenu(accessToken, menu) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.ADD_MENU}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 201) throw result;
      return result;
    } catch (error) {}
  }

  async updateMenu(accessToken, idMenu, menu) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.ADD_MENU}/${idMenu}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menu),
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {}
  }

  async deleteMenu(accessToken, idMenu) {
    try {
      const url = `${this.baseApi}${ENV.API_ROUTES.DELETE_MENU}/${idMenu}`;
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
}
