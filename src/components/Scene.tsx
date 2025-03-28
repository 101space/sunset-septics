import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei'
import { Group } from 'three'
import { MODEL_URL } from '../config/cdn'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function Model() {
  const { scene } = useGLTF(MODEL_URL)
  const groupRef = useRef<Group>(null)

  useEffect(() => {
    if (groupRef.current) {
      // Center the model
      const box = new THREE.Box3().setFromObject(groupRef.current)
      const center = box.getCenter(new THREE.Vector3())
      groupRef.current.position.sub(center)
    }
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Add subtle rotation
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

// Preload the model
useGLTF.preload(MODEL_URL)

export function Scene() {
  return (
    <div className="scene-container">
      <div className="scene-overlay">
        <h2>Interactive 3D Model</h2>
        <p>Drag to rotate, scroll to zoom</p>
      </div>
      <div className="scene-canvas">
        <div className="scene-controls">
          <button className="scene-button" onClick={() => window.location.href = '#contact'}>
            Get a Quote
          </button>
        </div>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={3}
            maxDistance={10}
            target={[0, 0, 0]}
          />
          <Environment preset="city" />
        </Canvas>
      </div>
    </div>
  )
} 