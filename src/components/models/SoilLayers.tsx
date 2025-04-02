import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Html } from '@react-three/drei'

interface SoilLayersProps {
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
}

export function SoilLayers({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }: SoilLayersProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Topsoil layer - aerobic treatment zone */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#8B4513" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Transition layer - mixed aerobic/anaerobic zone */}
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#A0522D" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Gravel layer - drainage and aeration */}
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#A9A9A9" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Sand layer - initial treatment and drainage */}
      <mesh castShadow receiveShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#DEB887" metalness={0.2} roughness={0.8} />
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
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Soil Treatment Zone</div>
          <div style={{ fontSize: '10px' }}>
            Natural soil layers that provide final treatment through physical, chemical, and biological processes.
          </div>
        </div>
      </Html>
    </group>
  )
} 