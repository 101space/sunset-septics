import React from 'react'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Html } from '@react-three/drei'

interface DistributionBoxProps {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export function DistributionBox({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }: DistributionBoxProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main box body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#2EC4B6" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Inlet pipe */}
      <mesh position={[-0.5, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Outlet pipes - evenly distributed */}
      <mesh position={[0.5, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0, 0.25, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0, 0.25, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Internal baffle for equal distribution */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.1, 0.5, 0.5]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Hover label with EPA description */}
      <Html position={[0, 1, 0]}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '3px',
          color: 'white',
          fontSize: '12px',
          maxWidth: '200px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Distribution Box</div>
          <div style={{ fontSize: '10px' }}>
            Distributes wastewater evenly into the drainfield through a network of pipes.
          </div>
        </div>
      </Html>
    </group>
  )
} 