import React, { createContext, useContext, useState, ReactNode } from "react";

interface ScaleContextType {
  scale: number;
  increaseScale: () => void;
  decreaseScale: () => void;
  setDefaultScale: (scale: number) => void;
}

const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

export default function useScale(): ScaleContextType {
  const context = useContext(ScaleContext);
  if (!context) {
    throw new Error("useScale must be used within a ScaleProvider");
  }
  return context;
}

interface ScaleProviderProps {
  children: ReactNode;
}

export function ScaleProvider({ children }: ScaleProviderProps) {
  const [scale, setScale] = useState(1);

  const increaseScale = () => {
    setScale(scale + 0.1);
  };

  const decreaseScale = () => {
    setScale(scale - 0.1);
  };

  const setDefaultScale = (defaultScale: number) => {
    setScale(defaultScale);
  };

  const value: ScaleContextType = {
    scale,
    increaseScale,
    decreaseScale,
    setDefaultScale,
  };

  return (
    <ScaleContext.Provider value={value}>{children}</ScaleContext.Provider>
  );
}
