import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { Group, Object3D, Vector3 } from 'three'
import * as THREE from 'three'

// Use a direct path to the model
const MODEL_PATH = 'assets/septic.glb';
console.log('Loading model from:', MODEL_PATH); // Debug log

// Camera positions for different sections
const MODEL_POSITIONS = {
  // System Overview - Top button
  overview: {
    position: [-12.2, 5.5, 13.4],
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
    position: [5.1, 4.6, 4.4],
    target: [0, -0.5, 0],
    zoom: 1.4,
  },
  
  // Drain Field - Fourth button
  drainfield: {
    position: [16.1, 12.6, 8.7],
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
const SECTION_MESH_MAPPING: Record<string, string[]> = {
  overview: [], // No specific highlighting for overview
  tank: ['tank', 'septic'],
  drainfield: ['drain', 'field'],
  dbox: ['distribution', 'box', 'dbox'], // Added D Box keywords
  soil: ['soil', 'dirt', 'gravel', 'ground']
}

interface ModelProps {
  activeSection: string;
  onAnimationComplete: () => void;
}

function Model({ activeSection, onAnimationComplete }: ModelProps) {
  const [modelError, setModelError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();
  const mousePosition = useRef({ x: 0, y: 0 });
  const [meshMap, setMeshMap] = useState<Record<string, THREE.Mesh>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const animationStartTime = useRef(0);
  const frameCounter = useRef(0);
  
  // Load the model
  const { scene } = useGLTF(MODEL_PATH);
  
  useEffect(() => {
    try {
      if (scene) {
        console.log('Model loaded successfully:', scene);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading model:', error);
      setModelError(error as Error);
    }
  }, [scene]);
  
  // Camera animation
  const cameraPosition = MODEL_POSITIONS[activeSection as keyof typeof MODEL_POSITIONS] || MODEL_POSITIONS.overview;
  const cameraTargetPosition = useRef(new Vector3(...cameraPosition.position as [number, number, number]));
  const cameraTargetLookAt = useRef(new Vector3(...cameraPosition.target as [number, number, number]));

  // Add keyboard control for position adjustment and capture
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only enable in development mode
      if (process.env.NODE_ENV !== 'development') return;
      
      // Print current position with P key
      if (e.key === 'p') {
        const target = new Vector3();
        camera.getWorldDirection(target);
        target.multiplyScalar(10).add(camera.position);
        
        console.log(`Camera position for COPYING:`, {
          position: [
            Math.round(camera.position.x * 10) / 10,
            Math.round(camera.position.y * 10) / 10,
            Math.round(camera.position.z * 10) / 10
          ],
          target: [
            Math.round(target.x * 10) / 10,
            Math.round(target.y * 10) / 10,
            Math.round(target.z * 10) / 10
          ],
          zoom: 1.5
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [camera]);

  useEffect(() => {
    console.log('Model loaded:', scene)
    
    // Build a map of meshes by name for easier access
    const meshMapTemp: Record<string, THREE.Mesh> = {}
    
    // Setup initial materials
    scene.traverse((child: Object3D) => {
      if (child instanceof THREE.Mesh) {
        console.log('Mesh name:', child.name); // Log all mesh names for debugging
        meshMapTemp[child.name.toLowerCase()] = child
        
        // Store original materials for later highlighting
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material.clone()
        }

        // Ensure material is MeshStandardMaterial before accessing properties
        let material = child.material as THREE.MeshStandardMaterial

        // Make tank and related parts semi-transparent
        if (child.name.toLowerCase().includes('tank')) {
          material.transparent = true;
          material.opacity = 0.6;
          material.roughness = 0.4;
          material.metalness = 0.3;
        } 
        // Make distribution box more visible
        else if (child.name.toLowerCase().includes('distribution') || 
                 child.name.toLowerCase().includes('box')) {
          material.transparent = true;
          material.opacity = 0.7;
          material.roughness = 0.3;
          material.metalness = 0.4;
          material.color.setHex(0x666666);
        }
        // Make pipes more visible
        else if (child.name.toLowerCase().includes('pipe')) {
          material.transparent = false;
          material.roughness = 0.2;
          material.metalness = 0.6;
          material.color.setHex(0x444444);
        }
        // Adjust dirt and gravel
        else if (child.name.toLowerCase().includes('dirt') || 
                 child.name.toLowerCase().includes('gravel')) {
          material.transparent = true;
          material.opacity = 0.85;
          material.roughness = 0.8;
          material.metalness = 0.1;
        }
      }
    });
    
    setMeshMap(meshMapTemp)

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [scene])
  
  // Update camera target when active section changes
  useEffect(() => {
    console.log('Active section changed to:', activeSection)
    cameraTargetPosition.current = new Vector3(...cameraPosition.position as [number, number, number])
    cameraTargetLookAt.current = new Vector3(...cameraPosition.target as [number, number, number])
    
    // Start animation timer
    setIsAnimating(true)
    animationStartTime.current = Date.now()
    
    // Apply highlighting based on active section
    highlightSection(activeSection)
  }, [activeSection, cameraPosition])
  
  // Function to highlight the active section
  const highlightSection = (section: string) => {
    // Reset all materials to original first
    Object.values(meshMap).forEach((mesh) => {
      if (mesh.userData.originalMaterial) {
        mesh.material = mesh.userData.originalMaterial.clone()
      }
    })
    
    // If it's overview, we're done (no highlighting)
    if (section === 'overview') return
    
    // Otherwise, highlight the relevant parts
    const highlightKeywords = SECTION_MESH_MAPPING[section] || []
    
    Object.entries(meshMap).forEach(([meshName, mesh]) => {
      const shouldHighlight = highlightKeywords.some(keyword => 
        meshName.includes(keyword.toLowerCase())
      )
      
      if (shouldHighlight) {
        const material = mesh.material as THREE.MeshStandardMaterial
        material.emissive = new THREE.Color(0x2EC4B6) // Same as --color-secondary
        material.emissiveIntensity = 0.3
        material.needsUpdate = true
      }
    })
  }

  useFrame((state) => {
    // Increment frame counter
    frameCounter.current += 1;
    
    if (groupRef.current) {
      // Gentle floating up/down animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.02;
      
      // New: Gentle left-right swaying animation
      groupRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

      // Only apply mouse-based rotation in overview mode
      if (activeSection === 'overview') {
        const targetRotationX = mousePosition.current.y * 0.02;
        const targetRotationY = mousePosition.current.x * 0.04;

        groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.01;
        groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.01;
      }
    }
    
    // Log camera position every 60 frames for debugging
    if (frameCounter.current % 60 === 0) {
      console.log(`Camera position for ${activeSection}:`, {
        position: [
          Math.round(camera.position.x * 10) / 10,
          Math.round(camera.position.y * 10) / 10,
          Math.round(camera.position.z * 10) / 10
        ],
        looking_at: [
          Math.round(cameraTargetLookAt.current.x * 10) / 10,
          Math.round(cameraTargetLookAt.current.y * 10) / 10,
          Math.round(cameraTargetLookAt.current.z * 10) / 10
        ]
      });
    }
    
    if (isAnimating) {
      const animationTime = Math.min(1, (Date.now() - animationStartTime.current) / 3000);  // Increased animation duration to 3 seconds
      const eased = easeOutQuintic(animationTime);
      
      // More precise and slower camera movement
      const newPosition = new Vector3().lerpVectors(
        camera.position.clone(),
        cameraTargetPosition.current,
        0.01 + eased * 0.04  // Reduced movement speed
      );
      camera.position.copy(newPosition);
      
      const currentTarget = new Vector3();
      camera.getWorldDirection(currentTarget);
      const targetDirection = cameraTargetLookAt.current.clone().sub(camera.position).normalize();
      
      const lerpedDirection = new Vector3().lerpVectors(
        currentTarget, 
        targetDirection, 
        0.01 + eased * 0.04  // Reduced movement speed to match position
      );
      camera.lookAt(camera.position.clone().add(lerpedDirection));
      
      // More precise completion check with reduced threshold
      if (animationTime >= 0.99 || 
          (camera.position.distanceTo(cameraTargetPosition.current) < 0.005 && 
           currentTarget.angleTo(targetDirection) < 0.005)) {
        camera.position.copy(cameraTargetPosition.current);
        camera.lookAt(cameraTargetLookAt.current);
        setIsAnimating(false);
        onAnimationComplete();
        console.log('Animation complete, returning control to user');
      }
    }
  })

  // Even smoother easing function - more gradual acceleration/deceleration
  const easeOutQuintic = (x: number): number => {
    return 1 - Math.pow(1 - x, 5);
  }

  if (modelError) {
    console.error('Failed to load model:', modelError);
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    );
  }

  if (isLoading) {
    return (
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
  }

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

interface SceneProps {
  modelSection: string;
}

export const Scene: React.FC<SceneProps> = ({ modelSection }) => {
  const [autoRotate, setAutoRotate] = useState(true);

  const handleInteraction = () => {
    setAutoRotate(false);
  };

  return (
    <div className="scene-container" style={{ 
      width: '100%', 
      height: '600px',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      overflow: 'hidden',
      marginTop: '2rem',
      paddingTop: '8rem'
    }}>
      <Canvas
        camera={{
          position: [-2.5, 2.8, 7],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        shadows
        dpr={[1, 2]}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        onPointerDown={handleInteraction}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Model activeSection={modelSection} onAnimationComplete={() => {}} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={15}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={0.5}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          target={[0, -1.5, 0]}
        />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload(MODEL_PATH);

export default Scene; 