'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatProps {
  children: React.ReactNode;
  speed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
}

export default function Float({
  children,
  speed = 1.5,
  rotationIntensity = 0.5,
  floatIntensity = 1,
}: FloatProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime() * speed;
    groupRef.current.position.y = Math.sin(t) * 0.12 * floatIntensity;
    groupRef.current.rotation.x = Math.cos(t * 0.6) * 0.08 * rotationIntensity;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.08 * rotationIntensity;
  });

  return <group ref={groupRef}>{children}</group>;
}
