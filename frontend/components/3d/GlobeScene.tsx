'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export interface City { name: string; lat: number; lng: number }
const R = 2;
const toVec = (lat: number, lng: number, r = R) => {
  const phi = ((90 - lat) * Math.PI) / 180, th = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

function Dots({ count }: { count: number }) {
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3), g = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2, r = Math.sqrt(1 - y * y), t = g * i;
      a.set([Math.cos(t) * r * R, y * R, Math.sin(t) * r * R], i * 3);
    }
    return a;
  }, [count]);
  return (
    <points>
      <bufferGeometry><bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} /></bufferGeometry>
      <pointsMaterial size={0.028} color="#9CC3CF" transparent opacity={0.85} />
    </points>
  );
}

function Arc({ a, b }: { a: THREE.Vector3; b: THREE.Vector3 }) {
  const line = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.4);
    const pts = new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(48);
    return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: '#D9A441' }));
  }, [a, b]);
  return <primitive object={line} />;
}

function Globe({ cities, selected, onSelect, dots }: { cities: City[]; selected: number; onSelect: (i: number) => void; dots: number }) {
  const g = useRef<THREE.Group>(null!);
  const hover = useRef(false);
  const vecs = useMemo(() => cities.map((c) => toVec(c.lat, c.lng)), [cities]);

  useFrame(({ camera }, dt) => {
    if (selected >= 0) {
      // turn the globe so the chosen city faces the camera, and zoom in slightly
      const target = Math.atan2(-vecs[selected].x, vecs[selected].z);
      const d = ((target - g.current.rotation.y + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      g.current.rotation.y += d * 0.08;
      camera.position.z += (5 - camera.position.z) * 0.06;
    } else {
      if (!hover.current) g.current.rotation.y += dt * 0.2;
      camera.position.z += (6.5 - camera.position.z) * 0.06;
    }
  });

  return (
    <group ref={g} rotation={[0.35, 0, 0]}>
      <mesh><sphereGeometry args={[R * 0.985, 48, 48]} /><meshBasicMaterial color="#0A2733" /></mesh>
      <Dots count={dots} />
      {vecs.slice(0, -1).map((v, i) => <Arc key={i} a={v} b={vecs[i + 1]} />)}
      {vecs.map((v, i) => (
        <mesh key={cities[i].name} position={v} scale={selected === i ? 1.7 : 1}
          onPointerOver={(e) => { e.stopPropagation(); hover.current = true; document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { hover.current = false; document.body.style.cursor = ''; }}
          onClick={(e) => { e.stopPropagation(); onSelect(i); }}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color={selected === i ? '#ffffff' : '#D9A441'} />
        </mesh>
      ))}
    </group>
  );
}

export default function GlobeScene(props: { cities: City[]; selected: number; onSelect: (i: number) => void; lite: boolean }) {
  return (
    <Canvas dpr={props.lite ? 1 : [1, 1.75]} camera={{ position: [0, 0, 6.5], fov: 45 }} onPointerMissed={() => props.onSelect(-1)} aria-hidden>
      <Globe cities={props.cities} selected={props.selected} onSelect={props.onSelect} dots={props.lite ? 900 : 2400} />
    </Canvas>
  );
}
