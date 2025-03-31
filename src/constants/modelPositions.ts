import { ModelPositions } from '../types/model';

export const MODEL_POSITIONS: ModelPositions = {
  // System Overview - Top button
  overview: {
    position: [-12.5, 5.5, 13.3],
    target: [0, -1, 0],     // Where the camera looks at
    zoom: 1,                // Zoom level
  },
  
  // Septic Tank - Second button
  tank: {
    position: [-4, 4, 6],
    target: [-1, -0.5, -1],
    zoom: 1.5,
  },
  
  // D Box - Third button
  dbox: {
    position: [5.6, 6.1, 4.5],
    target: [0, -0.5, 0],
    zoom: 1.4,
  },
  
  // Drain Field - Fourth button
  drainfield: {
    position: [12.5, 15.9, 7.5],
    target: [5, -1, 0],
    zoom: 1.1,
  },
  
  // Soil Layers - Bottom button
  soil: {
    position: [15.3, 7.1, 8.5],
    target: [0, -1.5, 0],
    zoom: 1.2
  },
};

// Map section IDs to mesh name patterns for highlighting
export const SECTION_MESH_MAPPING: Record<string, string[]> = {
  overview: [], // No specific highlighting for overview
  tank: ['tank', 'septic'],
  drainfield: ['drain', 'field'],
  dbox: ['distribution', 'box', 'dbox'], // Added D Box keywords
  soil: ['soil', 'dirt', 'gravel', 'ground']
}; 