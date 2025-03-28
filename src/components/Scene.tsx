import { useEffect, useRef } from 'react'
import { useGLTF, Environment, OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Group } from 'three'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF('/assets/septic.glb')
  const groupRef = useRef<Group>(null)
  const { camera } = useThree()
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    console.log('Model loaded:', scene)
    
    // Adjusted camera position for better view
    camera.position.set(-5, 10, 15)
    camera.lookAt(0, 0, 0)

    // Adjust material properties for specific parts
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        console.log('Mesh name:', child.name); // Log all mesh names for debugging

        // Make tank and related parts semi-transparent
        if (child.name.toLowerCase().includes('tank')) {
          child.material.transparent = true;
          child.material.opacity = 0.6;
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.4;
            child.material.metalness = 0.3;
          }
        } 
        // Make distribution box more visible
        else if (child.name.toLowerCase().includes('distribution') || 
                 child.name.toLowerCase().includes('box')) {
          child.material.transparent = true;
          child.material.opacity = 0.7;
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.3;
            child.material.metalness = 0.4;
            child.material.color.setHex(0x666666);
          }
        }
        // Make pipes more visible
        else if (child.name.toLowerCase().includes('pipe')) {
          child.material.transparent = false;
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.2;
            child.material.metalness = 0.6;
            child.material.color.setHex(0x444444);
          }
        }
        // Adjust dirt and gravel
        else if (child.name.toLowerCase().includes('dirt') || 
                 child.name.toLowerCase().includes('gravel')) {
          child.material.transparent = true;
          child.material.opacity = 0.85;
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.roughness = 0.8;
            child.material.metalness = 0.1;
          }
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
    <div className="canvas-container">
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
useGLTF.preload('/assets/septic.glb') 