import { createContext, useMemo, useState } from "react";
import { storage } from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => storage.getToken());
  const [user, setUser] = useState(null);

  const isAuthenticated = Boolean(token);

  const login = ({ token: nextToken, user: nextUser }) => {
    storage.setToken(nextToken);
    setToken(nextToken);
    setUser(nextUser || null);
  };

  const logout = () => {
    storage.clearToken();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      token,
      user,
    }),
    [isAuthenticated, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
