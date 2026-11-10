import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Trail, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Marketing channel orbiting node
interface OrbitNodeProps {
  radius: number;
  speed: number;
  color: string;
  size: number;
  initialAngle: number;
  tiltAngle: number;
  label: string;
  isReducedMotion: boolean;
}

const OrbitNode: React.FC<OrbitNodeProps> = ({
  radius,
  speed,
  color,
  size,
  initialAngle,
  tiltAngle,
  label,
  isReducedMotion,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    if (!isReducedMotion) {
      angleRef.current += speed * delta;
    }
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    // Apply tilt
    meshRef.current.position.set(
      x,
      Math.sin(tiltAngle) * z * 0.45,
      Math.cos(tiltAngle) * z
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.2}
        metalness={0.8}
      />
      {/* Halo around node */}
      <pointLight color={color} intensity={0.4} distance={2.5} />
    </mesh>
  );
};

// Orbit Ring Line
const OrbitRing: React.FC<{ radius: number; tilt: number; color?: string }> = ({
  radius,
  tilt,
  color = '#7138D8',
}) => {
  const linePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      pts.push(new THREE.Vector3(x, Math.sin(tilt) * z * 0.45, Math.cos(tilt) * z));
    }
    return pts;
  }, [radius, tilt]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.3 }))} />
  );
};

// Core Idea Orb with layers and mouse parallax
const IdeaOrb: React.FC<{
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
  isReducedMotion: boolean;
}> = ({ isHovered, setIsHovered, isReducedMotion }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);

  // Floating particles
  const particleCount = 45;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 1.8 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Mouse parallax
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.35;

    if (!isReducedMotion) {
      // Rotation
      groupRef.current.rotation.y += delta * (isHovered ? 0.35 : 0.18);
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetY * 0.4,
        3,
        delta
      );
      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        -targetX * 0.25,
        3,
        delta
      );

      // Core scale breathing
      if (coreRef.current) {
        const scale = (isHovered ? 1.08 : 1.0) + Math.sin(state.clock.elapsedTime * 2) * 0.03;
        coreRef.current.scale.set(scale, scale, scale);
      }

      // Counter-rotate wireframe
      if (wireframeRef.current) {
        wireframeRef.current.rotation.y -= delta * 0.25;
        wireframeRef.current.rotation.z += delta * 0.15;
      }

      if (outerCageRef.current) {
        outerCageRef.current.rotation.x += delta * 0.12;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* 1. Glowing Inner Idea Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <MeshDistortMaterial
          color="#7138D8"
          emissive="#521eb8"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.85}
          distort={isReducedMotion ? 0 : 0.28}
          speed={isReducedMotion ? 0 : 2.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* 2. Glassmorphic Outer Sphere Shell */}
      <mesh>
        <sphereGeometry args={[1.32, 32, 32]} />
        <meshPhysicalMaterial
          color="#B8A0FF"
          transparent
          opacity={0.32}
          roughness={0.1}
          metalness={0.1}
          transmission={0.88}
          thickness={1.2}
          ior={1.45}
        />
      </mesh>

      {/* 3. Geometric Neural Network Wireframe */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.48, 1]} />
        <meshStandardMaterial
          color="#B8A0FF"
          wireframe
          transparent
          opacity={0.38}
          emissive="#7138D8"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* 4. Outer Dodecahedron Halo */}
      <mesh ref={outerCageRef}>
        <dodecahedronGeometry args={[1.72, 0]} />
        <meshStandardMaterial
          color="#9065ED"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* 5. Orbit Rings */}
      <OrbitRing radius={2.2} tilt={0.4} color="#B8A0FF" />
      <OrbitRing radius={2.7} tilt={-0.5} color="#7138D8" />

      {/* 6. Orbiting Marketing Channel Nodes */}
      <OrbitNode
        radius={2.2}
        speed={0.8}
        color="#E1306C" // Instagram / Pink
        size={0.12}
        initialAngle={0}
        tiltAngle={0.4}
        label="Instagram"
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        radius={2.2}
        speed={0.8}
        color="#38BDF8" // LinkedIn / Sky Blue
        size={0.11}
        initialAngle={Math.PI * 0.7}
        tiltAngle={0.4}
        label="LinkedIn"
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        radius={2.7}
        speed={-0.65}
        color="#EF4444" // YouTube / Red
        size={0.13}
        initialAngle={Math.PI * 0.3}
        tiltAngle={-0.5}
        label="YouTube"
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        radius={2.7}
        speed={-0.65}
        color="#10B981" // Web / Emerald
        size={0.12}
        initialAngle={Math.PI * 1.3}
        tiltAngle={-0.5}
        label="Website"
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        radius={2.45}
        speed={0.5}
        color="#F59E0B" // Conversion / Amber
        size={0.1}
        initialAngle={Math.PI * 1.8}
        tiltAngle={0.15}
        label="Growth"
        isReducedMotion={isReducedMotion}
      />

      {/* 7. Floating Data Spark Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#B8A0FF"
          transparent
          opacity={0.7}
          sizeAttenuation
        />
      </points>

      {/* Internal Studio Lights */}
      <pointLight position={[0, 0, 0]} color="#B8A0FF" intensity={1.8} distance={4} />
    </group>
  );
};

// 2D Fallback for mobile, disabled WebGL, or low-end devices
export const Fallback2DHero: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center overflow-hidden">
      {/* Multi-layer glowing orb */}
      <div className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-[#7138D8] via-[#8B5CF6] to-[#B8A0FF] shadow-[0_0_90px_rgba(113,56,216,0.65)] flex items-center justify-center animate-pulse-subtle">
        {/* Inner neural rings */}
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#B8A0FF]/40 animate-spin-slow" />
        <div className="w-44 h-44 rounded-full bg-[#21113D]/60 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#B8A0FF] to-[#7138D8] shadow-inner flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/90 shadow-lg animate-ping opacity-75" />
          </div>
        </div>

        {/* Orbit badges */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#21113D] border border-[#B8A0FF]/50 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
          Instagram · Video Reels
        </div>
        <div className="absolute bottom-2 -left-2 bg-[#21113D] border border-[#B8A0FF]/50 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
          LinkedIn · B2B Hooks
        </div>
        <div className="absolute bottom-4 -right-2 bg-[#21113D] border border-[#B8A0FF]/50 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
          YouTube & Web DTC
        </div>
      </div>
    </div>
  );
};

// Error Boundary for Three.js WebGL canvas failure
class WebGLErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn('WebGL Context Warning, rendering 2D fallback:', error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Main 3D Hero Scene Export
export const ThreeHeroScene: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);

      // Check basic WebGL support
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) setHasWebGL(false);
      } catch {
        setHasWebGL(false);
      }

      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  if (!hasWebGL) {
    return <Fallback2DHero />;
  }

  return (
    <div className={`relative w-full h-[380px] sm:h-[460px] lg:h-[520px] ${className}`}>
      <WebGLErrorBoundary fallback={<Fallback2DHero />}>
        <Suspense fallback={<Fallback2DHero />}>
          <Canvas
            dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
            camera={{ position: [0, 0, 5.8], fov: 42 }}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            {/* Ambient & Studio Lights */}
            <ambientLight intensity={0.65} />
            <directionalLight position={[4, 5, 4]} intensity={1.4} color="#FFFFFF" />
            <directionalLight position={[-4, -3, -2]} intensity={0.7} color="#7138D8" />
            <pointLight position={[0, -2, 3]} intensity={0.8} color="#B8A0FF" />

            <Float
              speed={isReducedMotion ? 0 : 1.8}
              rotationIntensity={isReducedMotion ? 0 : 0.4}
              floatIntensity={isReducedMotion ? 0 : 0.6}
            >
              <IdeaOrb
                isHovered={isHovered}
                setIsHovered={setIsHovered}
                isReducedMotion={isReducedMotion}
              />
            </Float>
          </Canvas>
        </Suspense>
      </WebGLErrorBoundary>

      {/* Overlay interactive hint */}
      <div className="absolute bottom-2 right-4 pointer-events-none text-[10px] font-mono text-purple-300/80 bg-[#21113D]/70 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-xs flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>3D Neural Core · Orbiting Channels</span>
      </div>
    </div>
  );
};
