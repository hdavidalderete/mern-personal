import { useState, useEffect, createContext } from "react";
import { Auth, User } from "../api";
import { hasExpiredToken } from "../utils";
const userController = new User();
const authController = new Auth();
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAccessToken();
      const refreshToken = authController.getRefreshToken();
      if (!accessToken || !refreshToken) {
        logout();
        setLoading(false);
        return;
      }

      if (hasExpiredToken(accessToken)) {
        console.log("ha caducado");
        if (hasExpiredToken(refreshToken)) {
          logout();
        } else {
          await reLogin(refreshToken);
        }
      } else {
        await login(accessToken);
      }

      setLoading(false);
    })();
  }, []);

  const login = async (accessToken) => {
    try {
      setToken(accessToken);
      const { user } = await userController.getMe(accessToken);
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const reLogin = async (refreshToken) => {
    try {
      const { accessToken } = await authController.refreshsAccessToken(
        refreshToken
      );
      authController.setAccessToken(accessToken);
      login(accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authController.removeTokens();
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
  };
  if (loading) return null;
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
