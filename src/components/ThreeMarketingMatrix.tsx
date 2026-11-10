import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Layers, TrendingUp, Compass, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

interface FunnelTier {
  id: string;
  name: string;
  stage: string;
  y: number;
  radius: number;
  height: number;
  color: string;
  metric: string;
  tactic: string;
}

const FUNNEL_TIERS: FunnelTier[] = [
  {
    id: 'top',
    name: 'Top of Funnel: Scroll-Stopping Hooks',
    stage: 'Discovery & Awareness',
    y: 1.6,
    radius: 2.1,
    height: 0.35,
    color: '#8B5CF6',
    metric: '100% Cold Audience Inflow',
    tactic: '9:16 Reels, Creator Seeding, Curated Hashtag Clusters'
  },
  {
    id: 'mid',
    name: 'Middle of Funnel: Problem / Solution Alignment',
    stage: 'Consideration & Social Proof',
    y: 0.6,
    radius: 1.55,
    height: 0.35,
    color: '#7138D8',
    metric: '34% Consideration Velocity',
    tactic: 'Carousel breakdowns, Founder Storytelling, Customer Reviews'
  },
  {
    id: 'bottom',
    name: 'Bottom of Funnel: Conversion Activation',
    stage: 'First Order Purchase',
    y: -0.4,
    radius: 1.05,
    height: 0.35,
    color: '#EC4899',
    metric: '4.8% Direct Checkout Rate',
    tactic: 'Limited Starter Bundles, Risk-Reversal Guarantee, Retargeting'
  },
  {
    id: 'retention',
    name: 'Post-Purchase: VIP Retention Loop',
    stage: 'Loyalty & Repeat LTV',
    y: -1.3,
    radius: 0.65,
    height: 0.35,
    color: '#10B981',
    metric: '31% 60-Day Reorder Rate',
    tactic: 'Welcome VIP sequence, SMS product drops, Automated review requests'
  }
];

// Funnel Layer Mesh
const FunnelDisc: React.FC<{
  tier: FunnelTier;
  isSelected: boolean;
  onSelect: (t: FunnelTier) => void;
}> = ({ tier, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.25 * delta;
    }
  });

  return (
    <group position={[0, tier.y, 0]}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(tier);
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <cylinderGeometry args={[tier.radius * 0.82, tier.radius, tier.height, 48]} />
        <meshPhysicalMaterial
          color={tier.color}
          emissive={tier.color}
          emissiveIntensity={isSelected ? 0.9 : 0.25}
          roughness={0.15}
          metalness={0.3}
          transmission={0.65}
          transparent
          opacity={isSelected ? 0.95 : 0.7}
        />
      </mesh>

      {/* Edge glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, tier.height / 2 + 0.01, 0]}>
        <ringGeometry args={[tier.radius * 0.79, tier.radius * 0.83, 48]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={isSelected ? 0.9 : 0.4} />
      </mesh>
    </group>
  );
};

// 3D Growth Bars Scene
const GrowthBars: React.FC = () => {
  const bars = [
    { month: 'Month 1', height: 0.9, x: -1.8, color: '#A78BFA' },
    { month: 'Month 2', height: 1.6, x: -0.9, color: '#8B5CF6' },
    { month: 'Month 3', height: 2.4, x: 0.0, color: '#7138D8' },
    { month: 'Month 4', height: 3.2, x: 0.9, color: '#EC4899' },
    { month: 'Month 5', height: 4.1, x: 1.8, color: '#10B981' }
  ];

  return (
    <group position={[0, -1.5, 0]}>
      {bars.map((b, i) => (
        <group key={i} position={[b.x, b.height / 2, 0]}>
          <mesh>
            <boxGeometry args={[0.55, b.height, 0.55]} />
            <meshStandardMaterial
              color={b.color}
              emissive={b.color}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
          <mesh position={[0, b.height / 2 + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.55, 0.55]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {/* Grid Floor */}
      <gridHelper args={[8, 8, '#7138D8', '#B8A0FF']} position={[0, 0, 0]} />
    </group>
  );
};

export const ThreeMarketingMatrix: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'funnel' | 'growth'>('funnel');
  const [selectedTier, setSelectedTier] = useState<FunnelTier>(FUNNEL_TIERS[0]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="p-8 sm:p-10 border-b border-purple-100 flex flex-col md:flex-row md:items-end justify-between gap-6 bg-gradient-to-r from-white via-[#F8F6FF] to-white">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-100 text-violet-800 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-violet-600" />
              <span>Interactive 3D Marketing Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#21113D] tracking-tight">
              3D Campaign Pipeline Simulator
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Rotate, inspect, and explore how MarketMate.AI transforms cold audience interest into recurring revenue through structured strategic phases.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl shrink-0">
            <button
              onClick={() => setActiveMode('funnel')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'funnel'
                  ? 'bg-white text-violet-700 shadow-md scale-102'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>3D Funnel Architecture</span>
            </button>

            <button
              onClick={() => setActiveMode('growth')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeMode === 'growth'
                  ? 'bg-white text-violet-700 shadow-md scale-102'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>3D Growth Velocity</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Stage & Inspector */}
        <div className="grid lg:grid-cols-12 min-h-[460px]">
          {/* Left: 3D Canvas Area (Col 7) */}
          <div className="lg:col-span-7 bg-[#21113D] relative h-[420px] sm:h-[480px]">
            <Canvas camera={{ position: [0, 1.2, 5.2], fov: 48 }} dpr={[1, 1.8]}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
              <directionalLight position={[-5, -4, -4]} intensity={0.8} color="#B8A0FF" />

              <Suspense fallback={null}>
                {activeMode === 'funnel' ? (
                  <group>
                    {FUNNEL_TIERS.map((tier) => (
                      <FunnelDisc
                        key={tier.id}
                        tier={tier}
                        isSelected={selectedTier.id === tier.id}
                        onSelect={setSelectedTier}
                      />
                    ))}
                  </group>
                ) : (
                  <GrowthBars />
                )}
              </Suspense>

              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.9}
                dampingFactor={0.06}
              />
            </Canvas>

            {/* Instruction tooltip badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] text-white flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span>Drag to Rotate in 3D Space</span>
            </div>
          </div>

          {/* Right: Selected Layer Telemetry Inspector (Col 5) */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-white">
            {activeMode === 'funnel' ? (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                    Phase Inspector: {selectedTier.stage}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#21113D] mt-3">
                    {selectedTier.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Tactical deployment: <strong className="text-slate-800">{selectedTier.tactic}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Target Velocity Metric
                  </div>
                  <div className="text-2xl font-black text-violet-800 font-mono">
                    {selectedTier.metric}
                  </div>
                </div>

                {/* Quick switcher buttons */}
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-2">
                    Inspect Another Funnel Tier:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {FUNNEL_TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                          selectedTier.id === tier.id
                            ? 'bg-violet-600 text-white border-violet-600 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300'
                        }`}
                      >
                        <span className="block truncate font-bold">{tier.stage.split(' ')[0]}</span>
                        <span className="text-[10px] opacity-80 block truncate">{tier.metric}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    Growth Projections
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#21113D] mt-3">
                    5-Month Compounding Organic Velocity
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    By combining cohesive cross-platform hooks with systematic email nurture, your customer acquisition cost (CAC) declines by up to 58% over a 150-day deployment.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Organic Reach Lift</span>
                    <span className="text-lg font-black text-violet-700 font-mono">+340%</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Average CAC Reduction</span>
                    <span className="text-lg font-black text-emerald-600 font-mono">-58%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-purple-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Real-time Three.js Rendering</span>
              <a
                href="#engine-section"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-violet-700 hover:text-violet-900"
              >
                <span>Generate for Your Brand</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
