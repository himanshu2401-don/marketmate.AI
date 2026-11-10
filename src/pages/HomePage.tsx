import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  Compass,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Layers,
  ArrowRight,
  Target,
  Zap,
  Calendar,
  Share2,
} from 'lucide-react';
import { TiltCard } from '../components/TiltCard';
import { AIToolsGrid } from '../components/AIToolsGrid';
import { HowItWorks } from '../components/HowItWorks';
import { WhyMarketMate } from '../components/WhyMarketMate';
import { SampleShowcase } from '../components/SampleShowcase';
import { PageMeta } from '../components/PageMeta';
import { useCampaign } from '../context/CampaignContext';

export const HomePage: React.FC = () => {
  const { loadSample, hasApiKey } = useCampaign();

  return (
    <div>
      <PageMeta
        title="AI Marketing Engine & Campaign Copilot"
        description="Turn your ideas into marketing that works. MarketMate.AI transforms product briefs into comprehensive campaigns, social copy, and growth roadmaps."
      />

      {/* 1. HERO SECTION WITH INTERACTIVE 3D ATMOSPHERE */}
      <section className="relative bg-[#21113D] text-white pt-12 pb-24 overflow-hidden">
        {/* Ambient radial glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[400px] bg-[#7138D8]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#B8A0FF]/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#7138D8]/15 rounded-full blur-[90px] pointer-events-none" />

        {/* Ambient particle star grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#B8A0FF_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7138D8]/30 border border-[#B8A0FF]/30 text-xs font-semibold text-[#B8A0FF] tracking-wide backdrop-blur-sm animate-float">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Marketing Copilot</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.12]">
              Turn Your Ideas Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8A0FF] via-purple-100 to-white">
                Marketing That Works.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-purple-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
              From campaign strategy to scroll-stopping content, MarketMate.AI helps you plan, create, and grow with AI.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/campaign-planner"
                className="bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-98 text-white px-8 py-4 rounded-xl font-semibold shadow-xl shadow-[#7138D8]/30 hover:shadow-2xl hover:shadow-[#7138D8]/50 transition-all flex items-center gap-3 text-base cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                <span>Create My Campaign</span>
              </Link>

              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/15 active:scale-98 text-white border border-white/20 px-7 py-4 rounded-xl font-semibold transition-all text-base flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-5 h-5 text-[#B8A0FF]" />
                <span>Explore Features</span>
              </Link>
            </div>

            {/* Verified Feature Chips */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs text-purple-200/90 font-medium">
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

        </div>
      </section>

      {/* 2. DEDICATED FEATURE PILLARS WITH 3D TILT CARDS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Engines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#21113D]">
            Explore MarketMate.AI Features
          </h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Select a specialized workspace below to design complete campaigns, craft high-impact social copy, or map multi-channel growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Campaign Planner */}
          <TiltCard maxTilt={10} className="rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="bg-white p-7 rounded-3xl border border-purple-100 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7138D8] flex items-center justify-center font-bold mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7138D8] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  Full-Funnel Engine
                </span>
                <h3 className="text-xl font-bold text-[#21113D] mt-3 mb-2">
                  Campaign Planner
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Synthesize a 12-pillar marketing blueprint with audience insights, slogans, calendar, and channel recommendations in 15 seconds.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-50 flex items-center justify-between text-xs font-bold text-[#7138D8]">
                <Link
                  to="/campaign-planner"
                  className="inline-flex items-center gap-1.5 hover:text-[#5f2bc0]"
                >
                  <span>Open Planner Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-[11px] bg-purple-50 px-2 py-0.5 rounded text-purple-700 font-mono">
                  12 Deliverables
                </span>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Social Content Engine */}
          <TiltCard maxTilt={10} className="rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="bg-white p-7 rounded-3xl border border-purple-100 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7138D8] flex items-center justify-center font-bold mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7138D8] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  Organic & Paid
                </span>
                <h3 className="text-xl font-bold text-[#21113D] mt-3 mb-2">
                  Social Content Lab
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Generate platform-optimized captions broken into Hook, Body, and Call-to-Action, with hashtag clusters and weekly content calendars.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-50 flex items-center justify-between text-xs font-bold text-[#7138D8]">
                <Link
                  to="/social-content"
                  className="inline-flex items-center gap-1.5 hover:text-[#5f2bc0]"
                >
                  <span>Open Content Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-[11px] bg-purple-50 px-2 py-0.5 rounded text-purple-700 font-mono">
                  Hook + CTA
                </span>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Growth Strategy */}
          <TiltCard maxTilt={10} className="rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300">
            <div className="bg-white p-7 rounded-3xl border border-purple-100 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7138D8] flex items-center justify-center font-bold mb-6">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7138D8] bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                  Strategic Allocation
                </span>
                <h3 className="text-xl font-bold text-[#21113D] mt-3 mb-2">
                  Growth Strategy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Establish realistic CAC and ROAS benchmarks, capital allocation breakdowns, channel rankings, and a rapid 72-hour execution path.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-purple-50 flex items-center justify-between text-xs font-bold text-[#7138D8]">
                <Link
                  to="/growth-strategy"
                  className="inline-flex items-center gap-1.5 hover:text-[#5f2bc0]"
                >
                  <span>Explore Growth Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-[11px] bg-purple-50 px-2 py-0.5 rounded text-purple-700 font-mono">
                  KPIs & Funnels
                </span>
              </div>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 3. STANDALONE MODULAR AI MICRO-TOOLS */}
      <AIToolsGrid hasApiKey={hasApiKey} />

      {/* 5. HOW IT WORKS WORKFLOW */}
      <HowItWorks />

      {/* 6. WHY BUILDERS CHOOSE MARKETMATE */}
      <WhyMarketMate />

      {/* 7. SAMPLE CASE STUDY SHOWCASE */}
      <SampleShowcase onLoadSample={loadSample} />

      {/* 8. BOTTOM LAUNCH CTA BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#21113D] via-[#33185c] to-[#21113D] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#7138D8]/30 shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7138D8]/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-3xl mx-auto relative z-10 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/30 border border-[#B8A0FF]/30 text-xs font-semibold text-[#B8A0FF] animate-float">
              <Sparkles className="w-3.5 h-3.5" />
              Ready To Launch?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Transform Your Product Idea Into A Complete Campaign Today.
            </h2>
            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl mx-auto">
              No complex prompt engineering required. Input your brand brief and receive a tailored, production-ready marketing roadmap in seconds.
            </p>
            <div className="pt-2">
              <Link
                to="/campaign-planner"
                className="inline-flex items-center gap-3 bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-95 text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-[#7138D8]/40 transition-all cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                <span>Launch Marketing Engine</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
