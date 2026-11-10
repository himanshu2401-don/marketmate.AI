import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { 
  Sparkles, 
  RotateCw, 
  Eye, 
  Layers, 
  Maximize2, 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Radio, 
  Activity 
} from 'lucide-react';

interface ChannelTelemetry {
  id: string;
  name: string;
  color: string;
  role: string;
  cpaTarget: string;
  reachMultiplier: string;
  recommendedFormat: string;
}

const CHANNELS: ChannelTelemetry[] = [
  {
    id: 'ig',
    name: 'Instagram Video Reels & UGC',
    color: '#E1306C',
    role: 'Visual discovery & creator micro-drops',
    cpaTarget: '$14.20',
    reachMultiplier: '3.8x Viral Potential',
    recommendedFormat: '9:16 Short-form + Carousel'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Thought Authority',
    color: '#38BDF8',
    role: 'B2B Founder narrative & problem-first frameworks',
    cpaTarget: '$28.50',
    reachMultiplier: '4.2x Decision-maker Read',
    recommendedFormat: 'Text + Document Slide Decks'
  },
  {
    id: 'youtube',
    name: 'YouTube Shorts & Deep Dives',
    color: '#EF4444',
    role: 'Long-term organic search equity & product tests',
    cpaTarget: '$18.00',
    reachMultiplier: '5.1x Brand Trust Index',
    recommendedFormat: '1080p Horizontal + 60s Shorts'
  },
  {
    id: 'web',
    name: 'Direct Website & Conversion Pages',
    color: '#10B981',
    role: 'High-intent conversion & bundle checkout AOV',
    cpaTarget: '$11.80',
    reachMultiplier: '4.8% Direct Checkout',
    recommendedFormat: 'StoryBrand Landing Architecture'
  },
  {
    id: 'retention',
    name: 'VIP Retention & Email Drops',
    color: '#F59E0B',
    role: 'Post-purchase automated sequences & repeat LTV',
    cpaTarget: '$4.50',
    reachMultiplier: '31% 60-Day Reorder Rate',
    recommendedFormat: 'Plaintext Founder Emails + SMS'
  }
];

// Interactive Orbit Node
const OrbitNode: React.FC<{
  channel: ChannelTelemetry;
  radius: number;
  speed: number;
  size: number;
  initialAngle: number;
  tiltAngle: number;
  selectedId: string;
  onSelect: (ch: ChannelTelemetry) => void;
  isReducedMotion: boolean;
}> = ({
  channel,
  radius,
  speed,
  size,
  initialAngle,
  tiltAngle,
  selectedId,
  onSelect,
  isReducedMotion
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);
  const isSelected = selectedId === channel.id;

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    if (!isReducedMotion) {
      angleRef.current += speed * delta;
    }
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    meshRef.current.position.set(
      x,
      Math.sin(tiltAngle) * z * 0.45,
      Math.cos(tiltAngle) * z
    );
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(channel);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[isSelected ? size * 1.5 : size, 32, 32]} />
        <meshStandardMaterial
          color={channel.color}
          emissive={channel.color}
          emissiveIntensity={isSelected ? 2.5 : 1.2}
          roughness={0.15}
          metalness={0.85}
        />
        <pointLight
          color={channel.color}
          intensity={isSelected ? 1.5 : 0.6}
          distance={3}
        />
      </mesh>
    </group>
  );
};

// Orbit Ring
const OrbitRing: React.FC<{ radius: number; tilt: number; color?: string }> = ({
  radius,
  tilt,
  color = '#7138D8'
}) => {
  const linePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 96;
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
    <primitive
      object={
        new THREE.Line(
          lineGeometry,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.35
          })
        )
      }
    />
  );
};

// 3D AI Marketing Universe Scene
const MarketingUniverseScene: React.FC<{
  selectedChannel: ChannelTelemetry;
  onSelectChannel: (ch: ChannelTelemetry) => void;
  speedMultiplier: number;
  pulseActive: boolean;
  isReducedMotion: boolean;
}> = ({
  selectedChannel,
  onSelectChannel,
  speedMultiplier,
  pulseActive,
  isReducedMotion
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);
  const outerCageRef = useRef<THREE.Mesh>(null);

  // Floating background stars / data spark nodes
  const particleCount = 280;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 16;
      pos[i + 1] = (Math.random() - 0.5) * 10;
      pos[i + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (!isReducedMotion) {
      if (coreRef.current) {
        coreRef.current.rotation.y += 0.25 * delta * speedMultiplier;
        coreRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
      }
      if (wireframeRef.current) {
        wireframeRef.current.rotation.y -= 0.35 * delta * speedMultiplier;
        wireframeRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
      }
      if (outerCageRef.current) {
        outerCageRef.current.rotation.x += 0.2 * delta * speedMultiplier;
        outerCageRef.current.rotation.y += 0.15 * delta * speedMultiplier;
      }
      if (groupRef.current) {
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Central AI Neural Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <MeshDistortMaterial
          color="#7138D8"
          roughness={0.12}
          metalness={0.92}
          distort={pulseActive ? 0.45 : 0.28}
          speed={pulseActive ? 3.5 : 1.8}
          emissive="#21113D"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* 2. Inner Glowing Energy Core */}
      <mesh>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshBasicMaterial color="#B8A0FF" transparent opacity={0.85} />
      </mesh>

      {/* 3. Nested Geodesic Wireframe Matrix */}
      <mesh ref={wireframeRef}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshStandardMaterial
          color="#B8A0FF"
          wireframe
          transparent
          opacity={0.35}
          emissive="#7138D8"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* 4. Outer Dodecahedron Cage */}
      <mesh ref={outerCageRef}>
        <dodecahedronGeometry args={[1.82, 0]} />
        <meshStandardMaterial
          color="#9065ED"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* 5. Concentric Orbit Guidance Rings */}
      <OrbitRing radius={2.4} tilt={0.35} color="#B8A0FF" />
      <OrbitRing radius={2.9} tilt={-0.45} color="#7138D8" />
      <OrbitRing radius={3.4} tilt={0.15} color="#38BDF8" />

      {/* 6. Five Orbiting Marketing Channel Nodes */}
      <OrbitNode
        channel={CHANNELS[0]}
        radius={2.4}
        speed={0.7 * speedMultiplier}
        size={0.15}
        initialAngle={0}
        tiltAngle={0.35}
        selectedId={selectedChannel.id}
        onSelect={onSelectChannel}
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        channel={CHANNELS[1]}
        radius={2.4}
        speed={0.7 * speedMultiplier}
        size={0.14}
        initialAngle={Math.PI * 0.75}
        tiltAngle={0.35}
        selectedId={selectedChannel.id}
        onSelect={onSelectChannel}
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        channel={CHANNELS[2]}
        radius={2.9}
        speed={-0.55 * speedMultiplier}
        size={0.16}
        initialAngle={Math.PI * 0.3}
        tiltAngle={-0.45}
        selectedId={selectedChannel.id}
        onSelect={onSelectChannel}
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        channel={CHANNELS[3]}
        radius={2.9}
        speed={-0.55 * speedMultiplier}
        size={0.14}
        initialAngle={Math.PI * 1.35}
        tiltAngle={-0.45}
        selectedId={selectedChannel.id}
        onSelect={onSelectChannel}
        isReducedMotion={isReducedMotion}
      />
      <OrbitNode
        channel={CHANNELS[4]}
        radius={3.4}
        speed={0.45 * speedMultiplier}
        size={0.13}
        initialAngle={Math.PI * 1.85}
        tiltAngle={0.15}
        selectedId={selectedChannel.id}
        onSelect={onSelectChannel}
        isReducedMotion={isReducedMotion}
      />

      {/* 7. Star & Spark Data Particle Field */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#B8A0FF"
          transparent
          opacity={0.75}
          sizeAttenuation
        />
      </points>

      {/* Ambient and Key Point Lights */}
      <pointLight position={[0, 0, 0]} color="#B8A0FF" intensity={2.2} distance={5} />
    </group>
  );
};

// 2D Fallback Component
const Fallback2DView: React.FC = () => (
  <div className="w-full h-full min-h-[380px] flex items-center justify-center p-8 bg-gradient-to-b from-[#21113D] to-[#150a26] text-white rounded-3xl">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-violet-600 to-purple-400 animate-pulse flex items-center justify-center shadow-xl shadow-purple-500/30">
        <Sparkles className="w-10 h-10 text-white" />
      </div>
      <h4 className="text-xl font-bold">MarketMate.AI Core Active</h4>
      <p className="text-xs text-purple-200/80 max-w-sm">
        Accelerated 3D rendering mode active. Tap channels below to inspect cross-platform campaign vectors.
      </p>
    </div>
  </div>
);

// Main Export Component: ThreeHeroAtmosphere
export const ThreeHeroAtmosphere: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelTelemetry>(CHANNELS[0]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [pulseActive, setPulseActive] = useState(false);
  const [showHud, setShowHud] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [webGlSupported, setWebGlSupported] = useState(true);

  // Check WebGL and reduced motion
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebGlSupported(false);
    } catch {
      setWebGlSupported(false);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReducedMotion(true);
    }
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12 rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 via-[#21113D]/80 to-[#21113D] shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300">
      
      {/* Top Interactive Channel Selector Pills */}
      <div className="px-5 py-3.5 border-b border-white/15 bg-white/5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs z-20 relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span className="font-bold text-white tracking-wide">
            Interactive 3D Marketing Constellation
          </span>
          <span className="text-purple-300/60 hidden sm:inline">|</span>
          <span className="text-[11px] text-purple-200/80 font-mono hidden sm:inline">
            Drag to Orbit · Click Nodes to Inspect
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                selectedChannel.id === ch.id
                  ? 'bg-white text-[#21113D] shadow-md shadow-black/20 font-bold scale-105'
                  : 'bg-white/10 text-purple-200 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: ch.color }}
              />
              <span>{ch.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="relative h-[380px] sm:h-[460px] w-full">
        {webGlSupported ? (
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 46 }}
            dpr={[1, 1.8]}
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true
            }}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[6, 8, 5]} intensity={1.5} color="#FFFFFF" />
            <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#7138D8" />

            <Suspense fallback={null}>
              <MarketingUniverseScene
                selectedChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                speedMultiplier={speedMultiplier}
                pulseActive={pulseActive}
                isReducedMotion={isReducedMotion}
              />
            </Suspense>

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate={!isReducedMotion && speedMultiplier > 0}
              autoRotateSpeed={0.8 * speedMultiplier}
              dampingFactor={0.06}
              rotateSpeed={0.8}
            />
          </Canvas>
        ) : (
          <Fallback2DView />
        )}

        {/* Selected Channel Live Telemetry HUD Overlay (Top-Left) */}
        {showHud && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-[#21113D]/85 border border-white/20 backdrop-blur-xl shadow-xl text-white pointer-events-none transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: selectedChannel.color }}
              />
              <span className="text-xs font-mono uppercase tracking-wider text-[#B8A0FF]">
                Active Channel Vector
              </span>
            </div>

            <h4 className="text-base font-extrabold text-white leading-tight">
              {selectedChannel.name}
            </h4>
            <p className="text-xs text-purple-200/90 mt-1 leading-relaxed">
              {selectedChannel.role}
            </p>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-purple-300/80 block">Benchmark CPA</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {selectedChannel.cpaTarget}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-purple-300/80 block">Reach Velocity</span>
                <span className="text-xs font-bold text-[#B8A0FF] font-mono truncate block">
                  {selectedChannel.reachMultiplier.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Interactive Control Dock (Compliant with Three.js Skill Section 5) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[92%] sm:w-auto">
          <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#21113D]/90 border border-white/20 backdrop-blur-xl shadow-2xl text-xs text-white">
            <button
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 0 : 1))}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer font-medium"
              title="Toggle Orbit Speed"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Speed: {speedMultiplier === 0 ? 'Pause' : `${speedMultiplier}x`}</span>
            </button>

            <button
              onClick={() => setPulseActive((prev) => !prev)}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer font-medium ${
                pulseActive
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white'
              }`}
              title="Trigger Neural Pulse"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>Pulse Core</span>
            </button>

            <button
              onClick={() => setShowHud((prev) => !prev)}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer font-medium"
              title="Toggle Telemetry HUD"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showHud ? 'Hide Info' : 'Show Info'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics Strip */}
      <div className="px-6 py-4 bg-[#21113D]/95 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-white">
        <div>
          <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-white">
            12 Pillars
          </span>
          <span className="text-[11px] text-purple-200/80 block mt-0.5">Connected Strategy</span>
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-emerald-400">
            &lt; 15 Sec
          </span>
          <span className="text-[11px] text-purple-200/80 block mt-0.5">AI Synthesis Speed</span>
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-200">
            3.8x ROAS
          </span>
          <span className="text-[11px] text-purple-200/80 block mt-0.5">Direct Response Benchmark</span>
        </div>
        <div>
          <span className="text-xl sm:text-2xl font-black text-yellow-300">
            10 Micro-Tools
          </span>
          <span className="text-[11px] text-purple-200/80 block mt-0.5">Autonomous Generators</span>
        </div>
      </div>
    </div>
  );
};
