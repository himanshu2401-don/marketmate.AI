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
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#7138D8]/40 via-[#B8A0FF]/25 to-transparent rounded-3xl blur-2xl -z-10" />

              {/* 3D Model Artwork Container */}
              <div className="group relative rounded-3xl border border-white/20 bg-gradient-to-b from-white/10 to-[#21113D]/60 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden transition-all duration-500 hover:border-[#B8A0FF]/40">
                
                {/* 3D Render Image */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#21113D]">
                  <img
                    src="/src/assets/images/hero_marketing_engine_core_1793087834424.jpg"
                    alt="MarketMate.AI Futuristic 3D Marketing Engine Core with Floating Glass Cards and Neural Network"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlays for seamless depth blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21113D] via-transparent to-transparent opacity-70 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#21113D]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Micro-badge: Realtime Engine status */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#21113D]/80 border border-white/15 backdrop-blur-md text-[11px] font-semibold text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>AI Core Active</span>
                    <span className="text-purple-300">·</span>
                    <span className="text-[#B8A0FF] font-mono text-[10px]">Gemini 3.8</span>
                  </div>

                  {/* Floating Micro-badge: 3D Engine tag */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-mono text-purple-200">
                    <Sparkles className="w-3 h-3 text-[#B8A0FF]" />
                    <span>OCTANE 3D</span>
                  </div>
                </div>

                {/* Sub-card interactive telemetry overlay */}
                <div className="p-5 sm:p-6 bg-[#21113D]/90 backdrop-blur-md border-t border-white/10 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Live Metric 1 */}
                    <div className="bg-white/5 hover:bg-white/10 transition p-3 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 text-[#B8A0FF] text-xs font-semibold mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Growth Modeling</span>
                      </div>
                      <p className="text-xs text-purple-100 font-medium truncate">Multi-week Cadence</p>
                    </div>

                    {/* Live Metric 2 */}
                    <div className="bg-white/5 hover:bg-white/10 transition p-3 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2 text-[#B8A0FF] text-xs font-semibold mb-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#B8A0FF]" />
                        <span>Copy Synthesizer</span>
                      </div>
                      <p className="text-xs text-purple-100 font-medium truncate">Hook · Body · CTA</p>
                    </div>
                  </div>

                  {/* Sample Trigger */}
                  <div className="pt-2 flex items-center justify-between text-xs text-purple-200">
                    <span className="text-[11px] text-purple-300">Interactive 3D Marketing Architecture</span>
                    <button
                      onClick={onSamplePreviewClick}
                      className="text-[#B8A0FF] hover:text-white font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Explore Sample Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
