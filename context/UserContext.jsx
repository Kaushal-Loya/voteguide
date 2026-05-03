"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    age: null,
    location: { state: "", district: "" },
    isRegistered: null,
    language: "en",
  });

  const [session, setSession] = useState({
    currentStep: 0,
    completedSteps: [],
  });

  const updateContext = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  const updateSession = (newData) => {
    setSession((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider
      value={{ user, session, updateContext, updateSession }}
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
