import { createContext, useState, useEffect, ReactNode } from "react";
import * as api from "../api/gsheetApi";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(() => {
    const raw = localStorage.getItem("gonzacars_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (email: string, password: string) => {
    const res = await api.auth(email, password);
    if (res.ok) {
      setUser(res.seller);
      localStorage.setItem("gonzacars_user", JSON.stringify(res.seller));
      return { ok: true };
    } else {
      return { ok: false, error: res.error };
    }
  };

  const logout = () => {
    localStorage.removeItem("gonzacars_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
