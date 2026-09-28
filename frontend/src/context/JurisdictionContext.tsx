"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Jurisdiction = "India" | "International";

interface JurisdictionContextType {
  jurisdiction: Jurisdiction;
  setJurisdiction: (j: Jurisdiction) => void;
  toggleJurisdiction: () => void;
}

const JurisdictionContext = createContext<JurisdictionContextType>({
  jurisdiction: "India",
  setJurisdiction: () => {},
  toggleJurisdiction: () => {},
});

export const JurisdictionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jurisdiction, setJurisdictionState] = useState<Jurisdiction>("India");

  useEffect(() => {
    const saved = localStorage.getItem("ayurguru_jurisdiction") as Jurisdiction;
    if (saved === "India" || saved === "International") {
      setJurisdictionState(saved);
    }
  }, []);

  const setJurisdiction = (j: Jurisdiction) => {
    setJurisdictionState(j);
    localStorage.setItem("ayurguru_jurisdiction", j);
  };

  const toggleJurisdiction = () => {
    const next = jurisdiction === "India" ? "International" : "India";
    setJurisdiction(next);
  };

  return (
    <JurisdictionContext.Provider value={{ jurisdiction, setJurisdiction, toggleJurisdiction }}>
      {children}
    </JurisdictionContext.Provider>
  );
};

export const useJurisdiction = () => useContext(JurisdictionContext);
