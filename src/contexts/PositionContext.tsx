import React, { createContext, useContext, ReactNode, useState } from "react";

interface PositionContextType {
  setBlockCentered: (centered: boolean) => void;
  isDraggable: boolean;
  setIsDraggable: (draggable: boolean) => void;
  blockCoordinates: { x: number; y: number };
  moveBlockToCoordinates: (x: number, y: number) => void;
}

const PositionContext = createContext<PositionContextType | undefined>(
  undefined
);

export default function usePositionContext(): PositionContextType {
  const context = useContext(PositionContext);
  if (!context) {
    throw new Error(
      "usePositionContext must be used within a PositionProvider"
    );
  }
  return context;
}

interface PositionProviderProps {
  children: ReactNode;
}

export function PositionProvider({ children }: PositionProviderProps) {
  const [isDraggable, setIsDraggable] = useState(true);
  const [blockCoordinates, setBlockCoordinates] = useState({ x: 0, y: 0 });

  const moveBlockToCoordinates = (x: number, y: number) => {
    if (isDraggable) {
      setBlockCoordinates({ x, y });
    }
  };

  const setBlockCentered = (centered: boolean) => {
    if (centered) {
      setBlockCoordinates({ x: 0, y: 0 });
    }
  };

  const contextValue: PositionContextType = {
    setBlockCentered,
    isDraggable,
    setIsDraggable,
    blockCoordinates,
    moveBlockToCoordinates,
  };

  return (
    <PositionContext.Provider value={contextValue}>
      {children}
    </PositionContext.Provider>
  );
}
