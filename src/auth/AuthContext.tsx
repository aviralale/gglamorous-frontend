import React, { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated } from "@/auth/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const checkAuthStatus = () => setIsLoggedIn(isAuthenticated());
    window.addEventListener("storage", checkAuthStatus);
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
