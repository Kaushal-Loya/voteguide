"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const defaultUser = {
    age: null,
    location: { state: "", district: "" },
    isRegistered: null,
    language: "en",
  };

  const defaultSession = {
    currentStep: 0,
    completedSteps: [],
    isLoggedIn: false,
  };

  const [user, setUser] = useState(defaultUser);
  const [session, setSession] = useState(defaultSession);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("voteguide_user");
    const savedSession = localStorage.getItem("voteguide_session");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedSession) setSession(JSON.parse(savedSession));
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever state changes, but ONLY after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("voteguide_user", JSON.stringify(user));
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("voteguide_session", JSON.stringify(session));
    }
  }, [session, isInitialized]);

  const updateContext = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  const updateSession = (newData) => {
    setSession((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider
      value={{ user, session, updateContext, updateSession, isInitialized }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
