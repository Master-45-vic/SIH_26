"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/lib/api";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  demoLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  login: async () => {},
  demoLogin: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("ayurguru_token");
    if (savedToken) {
      setToken(savedToken);
      api.getMe()
        .then((userData) => setUser(userData))
        .catch(() => {
          localStorage.removeItem("ayurguru_token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      // Auto-initialize demo login for zero-friction evaluation
      api.demoLogin()
        .then((res) => {
          localStorage.setItem("ayurguru_token", res.access_token);
          setToken(res.access_token);
          setUser({
            id: res.user_id,
            email: res.email,
            full_name: res.full_name,
            role: res.role,
          });
        })
        .catch((err) => console.log("Demo auto-login notice:", err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    localStorage.setItem("ayurguru_token", res.access_token);
    setToken(res.access_token);
    setUser({
      id: res.user_id,
      email: res.email,
      full_name: res.full_name,
      role: res.role,
    });
  };

  const demoLogin = async () => {
    const res = await api.demoLogin();
    localStorage.setItem("ayurguru_token", res.access_token);
    setToken(res.access_token);
    setUser({
      id: res.user_id,
      email: res.email,
      full_name: res.full_name,
      role: res.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("ayurguru_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
