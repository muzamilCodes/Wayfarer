'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

/** A mountain silhouette: a strip whose top edge follows layered sine noise. */
function Ridge({ z, color, amp, seed, y = -2 }: { z: number; color: string; amp: number; seed: number; y?: number }) {
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(70, 10, 200, 1);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      if (p.getY(i) > 0) {
        const x = p.getX(i);
        const h = Math.sin(x * 0.28 + seed) * 1.4 + Math.sin(x * 0.7 + seed * 2) * 0.6 + Math.abs(Math.sin(x * 0.11 + seed * 3)) * 2.2;
        p.setY(i, 5 + Math.max(0, h) * amp);
      }
    }
    g.computeBoundingSphere();
    return g;
  }, [amp, seed]);
  return <mesh geometry={geo} position={[0, y, z]}><meshBasicMaterial color={color} fog /></mesh>;
}

function Snow({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { a[i * 3] = (Math.random() - 0.5) * 30; a[i * 3 + 1] = Math.random() * 14 - 4; a[i * 3 + 2] = Math.random() * 10 - 6; }
    return a;
  }, [count]);
  useFrame((_, dt) => {
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) { arr[i * 3 + 1] -= dt * 0.4; if (arr[i * 3 + 1] < -4) arr[i * 3 + 1] = 10; }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.06} color="#ffffff" transparent opacity={0.8} depthWrite={false} />
    </points>
  );
}

function Cloud({ x, y, z, s }: { x: number; y: number; z: number; s: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((_, dt) => { ref.current.position.x += dt * 0.15; if (ref.current.position.x > 22) ref.current.position.x = -22; });
  return (
    <group ref={ref} position={[x, y, z]} scale={s}>
      {[[0, 0], [1.1, 0.2], [-1.1, 0.1], [0.4, 0.5]].map(([dx, dy], i) => (
        <mesh key={i} position={[dx, dy, 0]}><circleGeometry args={[0.9, 20]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.55} depthWrite={false} /></mesh>
      ))}
    </group>
  );
}

/** Camera drifts with pointer and scroll for depth. */
function Rig() {
  useFrame(({ camera, pointer }) => {
    const sy = typeof window !== 'undefined' ? window.scrollY : 0;
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.3 + 0.5 - sy * 0.004 - camera.position.y) * 0.04;
    camera.lookAt(0, 1, -8);
  });
  return null;
}

export default function Scene({ tier }: { tier: 'full' | 'lite' }) {
  const full = tier === 'full';
  return (
    <Canvas dpr={full ? [1, 1.75] : 1} camera={{ position: [0, 0.5, 6], fov: 50 }} gl={{ antialias: full, powerPreference: 'low-power' }} aria-hidden>
      <fog attach="fog" args={['#B7D3DC', 8, 34]} />
      <mesh position={[5, 4.5, -25]}><circleGeometry args={[2.2, 32]} /><meshBasicMaterial color="#F6D28B" fog={false} /></mesh>
      <Ridge z={-22} color="#9CC3CF" amp={1.3} seed={1} y={-3} />
      <Ridge z={-16} color="#6E9AAB" amp={1.1} seed={4} y={-3.4} />
      <Ridge z={-10} color="#3D6F82" amp={0.9} seed={7} y={-3.8} />
      <Ridge z={-4} color="#0F3B4A" amp={0.6} seed={11} y={-4.4} />
      {full && <><Cloud x={-10} y={3} z={-14} s={1.6} /><Cloud x={6} y={4.2} z={-18} s={2} /></>}
      <Snow count={full ? 350 : 90} />
      <Rig />
    </Canvas>
  );
}
