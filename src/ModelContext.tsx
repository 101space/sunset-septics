import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define camera positions for each section
export const MODEL_POSITIONS = {
  overview: {
    position: [-5, 10, 15],
    target: [0, 0, 0],
    zoom: 1,
  },
  tank: {
    position: [-2, 5, 8],
    target: [0, 0, -2],
    zoom: 1.5,
  },
  drainfield: {
    position: [8, 6, 8],
    target: [5, -1, 0],
    zoom: 1.3,
  },
  pump: {
    position: [1, 4, 10],
    target: [1, -1, 0],
    zoom: 2,
  },
  soil: {
    position: [0, 0, 10],
    target: [0, -2, 0],
    zoom: 1.2,
  },
};

export type ModelSection = keyof typeof MODEL_POSITIONS;

interface ModelContextProps {
  activeSection: ModelSection;
  setActiveSection: (section: ModelSection) => void;
  cameraPosition: {
    position: number[];
    target: number[];
    zoom: number;
  };
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelContext must be used within a ModelProvider');
  }
  return context;
};

interface ModelProviderProps {
  children: ReactNode;
}

export const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<ModelSection>('overview');
  
  const cameraPosition = MODEL_POSITIONS[activeSection];
  
  return (
    <ModelContext.Provider
      value={{
        activeSection,
        setActiveSection,
        cameraPosition,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}; 