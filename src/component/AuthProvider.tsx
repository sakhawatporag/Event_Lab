"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AuthContextType = {
  loggedIn: boolean;
  isLoaded: boolean;
  userName: string;
  userEmail: string;
  login: (name?: string, email?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState("Alex Parker");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setLoggedIn(localStorage.getItem("eventLabLoggedIn") === "true");
      setUserName(localStorage.getItem("eventLabUserName") || "Alex Parker");
      setUserEmail(localStorage.getItem("eventLabUserEmail") || "");
      setIsLoaded(true);
    });
  }, []);

  const login = (name = "Alex Parker", email = "") => {
    localStorage.setItem("eventLabLoggedIn", "true");
    localStorage.setItem("eventLabUserName", name);
    localStorage.setItem("eventLabUserEmail", email);
    setUserName(name);
    setUserEmail(email);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("eventLabLoggedIn");
    localStorage.removeItem("eventLabUserName");
    localStorage.removeItem("eventLabUserEmail");
    setLoggedIn(false);
    setUserName("Alex Parker");
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ loggedIn, isLoaded, userName, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
