export type ModelSection = 'overview' | 'tank' | 'dbox' | 'drainfield' | 'soil';

export interface ModelPosition {
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
}

export interface ModelPositions {
  [key: string]: ModelPosition;
}

export interface ModelContextProps {
  activeSection: ModelSection;
  setActiveSection: (section: ModelSection) => void;
  cameraPosition: ModelPosition;
}

export interface ModelProviderProps {
  children: React.ReactNode;
}

export interface ModelProps {
  activeSection: ModelSection;
  onAnimationComplete: () => void;
}

export interface SceneProps {
  modelSection: ModelSection;
} 