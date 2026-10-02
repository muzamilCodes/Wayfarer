'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function CabAndRoad() {
  const carRef = useRef<THREE.Group>(null!);

  // Curve for the mountain winding road
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, -1.2, 0),
      new THREE.Vector3(-3, -0.6, 1),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(3, 0.6, -1),
      new THREE.Vector3(6, 1.2, 0),
    ]);
  }, []);

  const roadGeo = useMemo(() => {
    return new THREE.TubeGeometry(curve, 64, 0.45, 8, false);
  }, [curve]);

  useFrame(() => {
    if (!carRef.current) return;
    const sy = typeof window !== 'undefined' ? window.scrollY : 0;
    // Calculate progress along curve based on scroll position
    const t = Math.min(1, Math.max(0, (sy % 1200) / 1200));

    const pt = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t);

    carRef.current.position.copy(pt);
    carRef.current.position.y += 0.35;

    // Orient car along road tangent
    const angle = Math.atan2(tangent.x, tangent.z);
    carRef.current.rotation.y = angle;
  });

  return (
    <>
      {/* Mountain Winding Asphalt Road */}
      <mesh geometry={roadGeo}>
        <meshStandardMaterial color="#1E293B" roughness={0.7} />
      </mesh>

      {/* Pine Trees along the pass */}
      {[-4, -1.5, 1.5, 4.5].map((x, i) => (
        <group key={i} position={[x, (i % 2) * 0.4 - 0.5, (i % 2 === 0 ? 1.4 : -1.4)]}>
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.35, 1.2, 5]} />
            <meshStandardMaterial color="#164E63" />
          </mesh>
        </group>
      ))}

      {/* 3D Cab Model Driving Along Curve */}
      <group ref={carRef} scale={0.7}>
        {/* Cab Body */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.8, 0.4, 1.5]} />
          <meshStandardMaterial color="#D9A441" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 0.38, -0.1]}>
          <boxGeometry args={[0.7, 0.3, 0.8]} />
          <meshStandardMaterial color="#0F3B4A" roughness={0.3} />
        </mesh>
        {/* Headlights */}
        <mesh position={[0.25, 0.1, 0.76]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#FFFDE7" emissive="#FFFDE7" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[-0.25, 0.1, 0.76]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#FFFDE7" emissive="#FFFDE7" emissiveIntensity={1.5} />
        </mesh>
      </group>
    </>
  );
}

export default function MountainPathScene() {
  return (
    <div className="h-56 w-full overflow-hidden rounded-3xl bg-gradient-to-r from-deep via-lake to-[#1B4B5C] relative shadow-lg">
      <div className="absolute top-4 left-6 z-10">
        <span className="rounded-full bg-saffron/20 border border-saffron/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-saffron">
          Himalayan Mountain Route
        </span>
        <p className="mt-1 text-xs text-glacier">Scroll to watch the 4x4 navigate alpine curves</p>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 4.5, 6], fov: 42 }}
        gl={{ powerPreference: 'low-power', antialias: true }}
        aria-hidden
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 6, 4]} intensity={2.0} color="#ffffff" />
        <pointLight position={[-4, 2, 2]} intensity={0.9} color="#D9A441" />
        <CabAndRoad />
      </Canvas>
    </div>
  );
}
