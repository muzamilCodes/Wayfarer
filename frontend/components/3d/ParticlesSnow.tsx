'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function SnowFlakes({ count = 220 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35; // x
      pos[i * 3 + 1] = Math.random() * 20 - 5; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z

      vel[i * 3] = (Math.random() - 0.5) * 0.08; // drift x
      vel[i * 3 + 1] = -(0.25 + Math.random() * 0.4); // fall speed y
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04; // drift z
    }

    return { positions: pos, velocities: vel };
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velocities[i * 3 + 1] * delta * 2.5;
      pos[i * 3] += velocities[i * 3] * delta * 2.5;

      // Wrap around when falling below viewport
      if (pos[i * 3 + 1] < -6) {
        pos[i * 3 + 1] = 15;
        pos[i * 3] = (Math.random() - 0.5) * 35;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#ffffff"
        transparent
        opacity={0.65}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticlesSnow({ count = 180 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-75">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ powerPreference: 'low-power', antialias: false }}
        aria-hidden
      >
        <SnowFlakes count={count} />
      </Canvas>
    </div>
  );
}
