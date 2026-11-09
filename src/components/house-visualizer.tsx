'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import type { Group } from 'three';

function HouseModel() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <boxGeometry args={[6.5, 0.45, 6.5]} />
        <meshStandardMaterial color="#d7b66d" metalness={0.2} roughness={0.8} />
      </mesh>

      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[4.6, 2.4, 3.4]} />
        <meshStandardMaterial color="#f4efe6" metalness={0.05} roughness={0.9} />
      </mesh>

      <mesh position={[0, 2.1, 0]} castShadow>
        <boxGeometry args={[4.9, 0.35, 3.7]} />
        <meshStandardMaterial color="#d4a75d" metalness={0.2} roughness={0.7} />
      </mesh>

      {[-1.35, 1.35].map((x) => (
        <mesh key={x} position={[x, 0.8, 1.7]} castShadow>
          <boxGeometry args={[0.8, 1.5, 0.1]} />
          <meshStandardMaterial color="#e5d8c7" roughness={0.7} />
        </mesh>
      ))}

      {[-1.6, 0, 1.6].map((x) => (
        <mesh key={x} position={[x, 0.85, -1.7]} castShadow>
          <boxGeometry args={[0.9, 1.2, 0.12]} />
          <meshStandardMaterial color="#d8d3cc" roughness={0.7} />
        </mesh>
      ))}

      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[1.5, 1.35, 0.2]} />
        <meshStandardMaterial color="#b8812f" roughness={0.8} />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[0, 3.4, 0]}>
          <coneGeometry args={[2.2, 1.4, 4]} />
          <meshStandardMaterial color="#9d6b1d" metalness={0.15} roughness={0.7} />
        </mesh>
      </Float>
    </group>
  );
}

export function HouseVisualizer() {
  return (
    <div className="h-[440px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-slate-950 shadow-soft">
      <Canvas camera={{ position: [0, 4, 9], fov: 42 }}>
        <color attach="background" args={['#020817']} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} castShadow />
        <pointLight position={[-5, 3, -3]} intensity={1.2} color="#fbbf24" />
        <HouseModel />
        <OrbitControls enablePan={false} minDistance={7} maxDistance={12} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 2.2} />
      </Canvas>
    </div>
  );
}
