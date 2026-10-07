import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("clientra_token");
    const stored = localStorage.getItem("clientra_user");
    if (token && stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (role, email, password) => {
    const data = await api.login({ role, email, password });
    localStorage.setItem("clientra_token", data.token);
    localStorage.setItem("clientra_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("clientra_token");
    localStorage.removeItem("clientra_user");
    setUser(null);
  }, []);

  const isAllowed = useCallback(
    (page) => {
      if (!user) return false;
      if (user.pages === "*") return true;
      return user.pages.split(",").includes(page);
    },
    [user]
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, isAllowed, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
