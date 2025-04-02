import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Html } from '@react-three/drei'

interface DrainageFieldProps {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export function DrainageField({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }: DrainageFieldProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Main field area */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#8B4513" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Drainage pipes - perforated pipes for wastewater distribution */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0, 0.1, 0.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[0, 0.1, -0.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Inlet pipe */}
      <mesh position={[-2, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>

      {/* Gravel layer around pipes */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#A9A9A9" />
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
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Drainage Field</div>
          <div style={{ fontSize: '10px' }}>
            Network of perforated pipes that distribute wastewater into the soil for final treatment and disposal.
          </div>
        </div>
      </Html>
    </group>
  )
} 