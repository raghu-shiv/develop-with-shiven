// src/context/AuthContext.tsx
"use client";

import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define the types
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT" | "AUTH_ERROR" | "CHECK_AUTH";
  payload?: any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Reducer to manage auth state
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, loading: false, error: null };
    case "AUTH_ERROR":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case "CHECK_AUTH":
      return { ...state, loading: false, isAuthenticated: action.payload };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Function to simulate checking auth (fetch from API or localStorage)
  const checkAuth = () => {
    // Simulating an API call to check user authentication
    try {
      const isLoggedIn = !!localStorage.getItem("token");
      dispatch({ type: "CHECK_AUTH", payload: isLoggedIn });
    } catch (error) {
      console.error("Auth check failed", error);
      dispatch({
        type: "AUTH_ERROR",
        payload: "Failed to check authentication status",
      });
    }
  };

  const login = (token: string) => {
    // Simulate storing token
    localStorage.setItem("token", token);
    dispatch({ type: "LOGIN" });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const redirectToLogin = (redirectPath: string) => {
    router.push(`/auth/signin?redirect=${redirectPath}`);
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, redirectToLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
