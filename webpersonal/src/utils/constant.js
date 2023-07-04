const SERVER_IP = "localhost:3977";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}`,
  BASE_API: `http://${SERVER_IP}/api/`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    REFRESH_TOKEN: "auth/refresh_access_token",
    USER_ME: "user/me",
    ADD_USER: "user/user",
    EDIT_USER: "user/user",
    GET_ALL_USERS: "/user/users",
    DELETE_USER: "/user/user",
    GET_MENUS: "/menu/menus",
    ADD_MENU: "/menu/menu",
    EDIT_MENU: "/menu/menu",
    DELETE_MENU: "/menu/menu",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
