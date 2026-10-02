'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Float from './Float';
import * as THREE from 'three';
import Scene3D from './Scene3D';

export type Icon3DType =
  | 'mountain'
  | 'compass'
  | 'hotel'
  | 'cab'
  | 'shikara'
  | 'ski'
  | 'boot'
  | 'envelope'
  | 'tag';

function IconMesh({ type }: { type: Icon3DType }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.8;
  });

  return (
    <group ref={meshRef}>
      {type === 'mountain' && (
        <group>
          {/* Mountain Peak */}
          <mesh position={[0, 0, 0]}>
            <coneGeometry args={[1.2, 1.8, 5]} />
            <meshStandardMaterial color="#0F3B4A" roughness={0.3} metalness={0.2} />
          </mesh>
          {/* Snow cap */}
          <mesh position={[0, 0.45, 0]}>
            <coneGeometry args={[0.62, 0.9, 5]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} />
          </mesh>
        </group>
      )}

      {type === 'hotel' && (
        <group>
          {/* Main building */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.2, 1.4, 1]} />
            <meshStandardMaterial color="#0F3B4A" roughness={0.3} />
          </mesh>
          {/* Roof */}
          <mesh position={[0, 0.95, 0]}>
            <coneGeometry args={[1.1, 0.6, 4]} />
            <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Windows */}
          <mesh position={[0, 0.1, 0.52]}>
            <boxGeometry args={[0.3, 0.35, 0.05]} />
            <meshStandardMaterial color="#F5F9FA" emissive="#DCEBEF" emissiveIntensity={0.6} />
          </mesh>
        </group>
      )}

      {type === 'cab' && (
        <group rotation={[0.1, 0.2, 0]}>
          {/* Vehicle base */}
          <mesh position={[0, -0.15, 0]}>
            <boxGeometry args={[1.6, 0.5, 0.9]} />
            <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.5} />
          </mesh>
          {/* Cabin */}
          <mesh position={[-0.1, 0.25, 0]}>
            <boxGeometry args={[0.9, 0.45, 0.75]} />
            <meshStandardMaterial color="#0F3B4A" roughness={0.3} />
          </mesh>
          {/* Wheels */}
          {[-0.5, 0.5].map((x, i) =>
            [-0.45, 0.45].map((z, j) => (
              <mesh key={`${i}-${j}`} position={[x, -0.35, z]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.12, 16]} />
                <meshStandardMaterial color="#12232B" roughness={0.7} />
              </mesh>
            ))
          )}
        </group>
      )}

      {type === 'shikara' && (
        <group rotation={[0.2, 0.3, -0.1]}>
          {/* Boat hull */}
          <mesh position={[0, -0.2, 0]}>
            <coneGeometry args={[0.6, 1.8, 4]} />
            <meshStandardMaterial color="#8B5A2B" roughness={0.5} />
          </mesh>
          {/* Canopy / Roof */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.7, 0.1, 0.9]} />
            <meshStandardMaterial color="#D9A441" roughness={0.2} />
          </mesh>
          {/* Velvet cushion */}
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.5, 0.15, 0.6]} />
            <meshStandardMaterial color="#6B4FA0" roughness={0.4} />
          </mesh>
        </group>
      )}

      {type === 'ski' && (
        <group rotation={[0.3, 0.2, 0.4]}>
          {/* Ski planks */}
          {[-0.2, 0.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <boxGeometry args={[0.15, 2.0, 0.04]} />
              <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.4} />
            </mesh>
          ))}
          {/* Ski pole */}
          <mesh position={[0, 0, 0.2]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.02, 0.02, 1.8, 12]} />
            <meshStandardMaterial color="#DCEBEF" metalness={0.8} />
          </mesh>
        </group>
      )}

      {type === 'boot' && (
        <group rotation={[0.1, 0.4, 0]}>
          {/* Boot sole */}
          <mesh position={[0.1, -0.3, 0]}>
            <boxGeometry args={[1.1, 0.2, 0.5]} />
            <meshStandardMaterial color="#12232B" roughness={0.8} />
          </mesh>
          {/* Boot upper */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.6, 0.7, 0.45]} />
            <meshStandardMaterial color="#8B5A2B" roughness={0.4} />
          </mesh>
        </group>
      )}

      {type === 'compass' && (
        <group rotation={[0.3, 0, 0]}>
          {/* Compass ring */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.85, 0.12, 16, 32]} />
            <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.7} />
          </mesh>
          {/* Dial face */}
          <mesh position={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.78, 0.78, 0.05, 32]} />
            <meshStandardMaterial color="#0A2733" roughness={0.5} />
          </mesh>
          {/* Needle */}
          <mesh position={[0, 0, 0.05]} rotation={[0, 0, Math.PI / 4]}>
            <coneGeometry args={[0.18, 0.9, 3]} />
            <meshStandardMaterial color="#F5F9FA" roughness={0.1} />
          </mesh>
        </group>
      )}

      {type === 'envelope' && (
        <group rotation={[0.2, 0.3, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.4, 0.9, 0.1]} />
            <meshStandardMaterial color="#F5F9FA" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.15, 0.06]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.6, 0.4, 3]} />
            <meshStandardMaterial color="#D9A441" roughness={0.2} />
          </mesh>
        </group>
      )}

      {type === 'tag' && (
        <group rotation={[0.3, 0.2, -0.2]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.9, 1.3, 0.08]} />
            <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <torusGeometry args={[0.15, 0.04, 12, 24]} />
            <meshStandardMaterial color="#0F3B4A" />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function FloatingIcon3D({
  type = 'mountain',
  className = 'h-24 w-24',
}: {
  type?: Icon3DType;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <Scene3D
        camera={{ position: [0, 0, 3.8], fov: 40 }}
        className="h-full w-full"
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 3]} intensity={1.8} />
        <pointLight position={[-2, -2, 2]} intensity={0.8} color="#D9A441" />
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
          <IconMesh type={type} />
        </Float>
      </Scene3D>
    </div>
  );
}
