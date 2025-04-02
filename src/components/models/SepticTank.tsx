import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Html } from '@react-three/drei'

interface SepticTankProps {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export function SepticTank({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }: SepticTankProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main tank body - watertight container */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 1.2, 1.5]} />
        <meshStandardMaterial color="#4A90E2" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Inlet pipe */}
      <mesh position={[-1, 0.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Outlet pipe */}
      <mesh position={[1, 0.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Internal baffles */}
      <mesh position={[-0.5, 0.6, 0]}>
        <boxGeometry args={[0.1, 1, 1.5]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0.5, 0.6, 0]}>
        <boxGeometry args={[0.1, 1, 1.5]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Hover label with EPA description */}
      <Html position={[0, 2, 0]}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '3px',
          color: 'white',
          fontSize: '12px',
          maxWidth: '200px',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Septic Tank</div>
          <div style={{ fontSize: '10px' }}>
            Watertight container that receives and partially treats wastewater. Solids settle to bottom while greases float to top.
          </div>
        </div>
      </Html>
    </group>
  )
} 