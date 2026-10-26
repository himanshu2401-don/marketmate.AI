import React from 'react';
import {
  Sparkles,
  Rocket,
  Compass,
  CheckCircle2,
  TrendingUp,
  Target,
  MessageSquare,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface HeroProps {
  onCreateClick: () => void;
  onExploreClick: () => void;
  onSamplePreviewClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onCreateClick,
  onExploreClick,
  onSamplePreviewClick,
}) => {
  return (
    <section id="home" className="relative bg-[#21113D] text-white pt-16 pb-24 overflow-hidden">
      {/* Background radial glows and atmospheric effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[#7138D8]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-12 right-12 w-96 h-96 bg-[#B8A0FF]/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#7138D8]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Decorative ambient particle stars */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#B8A0FF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/30 border border-[#B8A0FF]/30 text-xs font-semibold text-[#B8A0FF] tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Marketing Copilot</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Turn Your Ideas Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8A0FF] via-purple-100 to-white">
                Marketing That Works.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-purple-100/90 max-w-2xl font-normal leading-relaxed">
              From campaign strategy to scroll-stopping content, MarketMate.AI helps you plan, create, and grow with AI.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onCreateClick}
                className="bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-98 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-[#7138D8]/30 hover:shadow-2xl hover:shadow-[#7138D8]/50 transition-all flex items-center gap-3 text-base cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                <span>Create My Campaign</span>
              </button>

              <button
                onClick={onExploreClick}
                className="bg-white/10 hover:bg-white/15 active:scale-98 text-white border border-white/20 px-7 py-4 rounded-xl font-semibold transition-all text-base flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-[#B8A0FF]" />
                <span>Explore Features</span>
              </button>
            </div>

            {/* Small feature labels */}
            <div className="flex flex-wrap items-center gap-3 pt-4 text-xs text-purple-200/90 font-medium">
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B8A0FF]" />
                <span>AI-Powered Strategy</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B8A0FF]" />
                <span>Content Creation</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-[#B8A0FF]" />
                <span>Growth Insights</span>
              </span>
            </div>
          </div>

          {/* Right Column: 3D Marketing Engine Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#7138D8]/40 via-[#B8A0FF]/20 to-transparent rounded-3xl blur-2xl -z-10" />

              {/* Glassmorphic 3D Card Stack */}
              <div className="bg-gradient-to-b from-white/15 to-white/5 p-6 sm:p-7 rounded-3xl border border-white/20 backdrop-blur-xl shadow-2xl shadow-black/40 relative overflow-hidden">
                
                {/* Floating Violet AI Core */}
                <div className="relative flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Animated Core Rings */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7138D8] via-[#8B5CF6] to-[#B8A0FF] flex items-center justify-center shadow-lg shadow-[#7138D8]/60 animate-pulse-subtle">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#21113D] shadow-sm animate-ping" />
                      <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#21113D]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-wider font-semibold text-[#B8A0FF]">
                          MarketMate Engine
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#7138D8]/50 text-purple-100 font-mono">
                          v1.0
                        </span>
                      </div>
                      <p className="text-base font-bold text-white">Active Strategic Synthesizer</p>
                      <p className="text-xs text-purple-200/80">Real-time reasoning & multi-channel planning</p>
                    </div>
                  </div>

                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] text-purple-300 block">Model</span>
                    <span className="text-xs font-mono font-semibold text-[#B8A0FF]">Gemini 3.8</span>
                  </div>
                </div>

                {/* Growth Chart Simulation & Interactive Cards */}
                <div className="mt-5 space-y-3.5">
                  {/* Card 1: Objective & Funnel */}
                  <div className="bg-white/10 hover:bg-white/15 transition rounded-2xl p-3.5 border border-white/15 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#7138D8]/40 border border-[#B8A0FF]/30 flex items-center justify-center text-[#B8A0FF]">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-purple-200">Objective Optimized</p>
                        <p className="text-sm font-semibold text-white">Brand Discovery & Conversion</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-[#7138D8] text-white px-2.5 py-1 rounded-md">
                      Calibrated
                    </span>
                  </div>

                  {/* Card 2: Growth Chart Visual */}
                  <div className="bg-white/10 rounded-2xl p-3.5 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold text-white">Growth Trajectory Projection</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-mono font-semibold">4-Week Cadence</span>
                    </div>

                    {/* SVG Growth Curve */}
                    <div className="h-16 w-full pt-1">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 280 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7138D8" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#7138D8" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,50 Q40,46 70,38 T140,28 T210,16 T280,6 L280,60 L0,60 Z"
                          fill="url(#growthGrad)"
                        />
                        <path
                          d="M0,50 Q40,46 70,38 T140,28 T210,16 T280,6"
                          fill="none"
                          stroke="#B8A0FF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="70" cy="38" r="3.5" fill="#FFFFFF" stroke="#7138D8" strokeWidth="2" />
                        <circle cx="140" cy="28" r="3.5" fill="#FFFFFF" stroke="#7138D8" strokeWidth="2" />
                        <circle cx="210" cy="16" r="3.5" fill="#FFFFFF" stroke="#7138D8" strokeWidth="2" />
                        <circle cx="280" cy="6" r="4.5" fill="#34D399" stroke="#21113D" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[10px] text-purple-200/80 pt-1 font-mono">
                      <span>Launch Week</span>
                      <span>Mid Funnel</span>
                      <span>Scale & Retention</span>
                    </div>
                  </div>

                  {/* Card 3: Content Preview */}
                  <div className="bg-white/10 hover:bg-white/15 transition rounded-2xl p-3.5 border border-white/15 backdrop-blur-md flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#7138D8]/40 border border-[#B8A0FF]/30 flex items-center justify-center text-[#B8A0FF]">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-purple-200">Copy & Captions</p>
                        <p className="text-sm font-semibold text-white">3 High-Conversion Hooks Ready</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold bg-emerald-500/80 text-white px-2.5 py-1 rounded-md">
                      Generated
                    </span>
                  </div>
                </div>

                {/* Footer Link to Sample */}
                <div className="mt-5 pt-3.5 border-t border-white/10 text-center">
                  <button
                    onClick={onSamplePreviewClick}
                    className="text-xs text-[#B8A0FF] hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium cursor-pointer"
                  >
                    <span>Click to inspect "Biskify" sample campaign</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
