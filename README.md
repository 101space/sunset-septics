# Sun Set Landscaping - 3D Septic System Visualization

An interactive 3D visualization of a septic system, built with React Three Fiber and Three.js. This project showcases the components and functionality of a conventional septic system in an engaging and educational way.

## Features

- Interactive 3D model of a conventional septic bed
- Detailed visualization of system components:
  - Septic tank with cutaway view
  - Distribution box
  - Drainage field with perforated pipes
  - Soil layers (topsoil, gravel, sand)
- Camera controls for rotation, zoom, and pan
- Hover labels for component identification
- Responsive design for desktop and mobile
- Sunset-themed lighting and materials
- Loading screen with progress indicator

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sunset-landscaping.git
cd sunset-landscaping
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── models/
│   │   ├── SepticTank.tsx
│   │   ├── DistributionBox.tsx
│   │   ├── DrainageField.tsx
│   │   └── SoilLayers.tsx
│   ├── Scene.tsx
│   ├── UI.tsx
│   └── LoadingScreen.tsx
├── styles/
│   └── global.css
├── App.tsx
└── main.tsx
```

## Controls

- Left Mouse Button: Rotate camera
- Right Mouse Button: Pan camera
- Mouse Wheel: Zoom in/out
- Hover over components to see labels
- Use UI buttons to show/hide information and reset camera view

## Technologies Used

- React
- Three.js
- React Three Fiber
- React Three Drei
- TypeScript
- Vite
- GSAP (for animations)

## Performance Considerations

- Models are optimized for web performance
- Level of detail (LOD) implementation for complex models
- Texture and material optimization
- Proper garbage collection
- Progressive loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Three.js community for excellent documentation and examples
- React Three Fiber team for making Three.js accessible in React
- Sun Set Landscaping for providing the opportunity to create this visualization 