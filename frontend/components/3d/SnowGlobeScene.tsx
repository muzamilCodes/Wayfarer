'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Float from './Float';
import * as THREE from 'three';
import Scene3D from './Scene3D';

function GlobeContent() {
  const globeRef = useRef<THREE.Group>(null!);
  const snowRef = useRef<THREE.Points>(null!);

  const count = 120;
  const snowPositions = useRef(
    new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 2.2)
    )
  ).current;

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.35;
    }
    if (snowRef.current) {
      const pos = snowRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] -= delta * 0.4;
        if (pos[i * 3 + 1] < -1.1) {
          pos[i * 3 + 1] = 1.1;
        }
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wooden / Brass Pedestal */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.45, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, -1.15, 0]}>
        <torusGeometry args={[1.15, 0.08, 16, 32]} />
        <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Internal Himalayan Mountain Terrain */}
      <group position={[0, -0.4, 0]}>
        {/* Base hill */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[1.05, 1.05, 0.3, 32]} />
          <meshStandardMaterial color="#0F3B4A" roughness={0.6} />
        </mesh>

        {/* Central Peak */}
        <mesh position={[0, 0.35, 0]}>
          <coneGeometry args={[0.7, 1.3, 5]} />
          <meshStandardMaterial color="#1E4D5F" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <coneGeometry args={[0.36, 0.6, 5]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>

        {/* Secondary Peak */}
        <mesh position={[-0.45, 0.1, 0.2]}>
          <coneGeometry args={[0.45, 0.85, 4]} />
          <meshStandardMaterial color="#0F3B4A" roughness={0.4} />
        </mesh>
        <mesh position={[-0.45, 0.35, 0.2]}>
          <coneGeometry args={[0.22, 0.4, 4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>

        {/* Miniature Alpine Pine Trees */}
        {[[0.4, -0.15, 0.3], [0.55, -0.15, -0.2], [-0.2, -0.15, 0.6]].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]}>
            <coneGeometry args={[0.12, 0.38, 4]} />
            <meshStandardMaterial color="#194D33" />
          </mesh>
        ))}
      </group>

      {/* Swirling Snow Particles Inside Globe */}
      <points ref={snowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={snowPositions}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#ffffff" transparent opacity={0.8} />
      </points>

      {/* Translucent Glass Sphere */}
      <mesh>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshPhysicalMaterial
          color="#DCEBEF"
          transmission={0.92}
          opacity={0.3}
          transparent
          roughness={0.05}
          ior={1.4}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}

export default function SnowGlobeScene() {
  return (
    <div className="h-full w-full">
      <Scene3D
        camera={{ position: [0, 0, 4.4], fov: 45 }}
        className="h-full w-full"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={1.2} color="#F6D28B" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
          <GlobeContent />
        </Float>
      </Scene3D>
    </div>
  );
}
