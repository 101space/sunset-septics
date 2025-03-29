import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Group, Object3D } from 'three'
import * as THREE from 'three'

// Get the base URL for GitHub Pages
const basePath = import.meta.env.BASE_URL;
// Use the base path for the model
const MODEL_PATH = `${basePath}assets/septic.glb`

function Model() {
  const { scene } = useGLTF(MODEL_PATH)
  const groupRef = useRef<Group>(null)
  const { camera } = useThree()
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    console.log('Model loaded:', scene)
    
    // Adjusted camera position for better view
    camera.position.set(-5, 10, 15)
    camera.lookAt(0, 0, 0)

    // Adjust material properties for specific parts
    scene.traverse((child: Object3D) => {
      if (child instanceof THREE.Mesh) {
        console.log('Mesh name:', child.name); // Log all mesh names for debugging

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

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [camera, scene])

  useFrame((state) => {
    if (groupRef.current) {
      // Reduced floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05

      // Gentler mouse-based rotation
      const targetRotationX = mousePosition.current.y * 0.05
      const targetRotationY = mousePosition.current.x * 0.1

      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.03
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.03
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

export function Scene() {
  return (
    <div 
      className="canvas-container"
      role="img" 
      aria-label="Interactive 3D model of a septic system showing the tank, distribution box, pipes, and drain field"
    >
      <Canvas
        camera={{
          position: [-5, 10, 15],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        shadows
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0000" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#0000ff" />
        <Model />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={8}
          maxDistance={25}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
        />
        <Environment preset="sunset" />
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -2, 0]}
          receiveShadow
        >
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            color="#2a2a2a"
            metalness={0.2}
            roughness={0.8}
            envMapIntensity={0.5}
          />
        </mesh>
      </Canvas>
    </div>
  )
}

// Preload the model
useGLTF.preload(MODEL_PATH) 