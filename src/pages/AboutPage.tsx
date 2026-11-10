import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Target, 
  Zap, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  Cpu, 
  Users, 
  Layers, 
  BarChart3, 
  Rocket, 
  BookOpen,
  HeartHandshake,
  MessageSquare
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { TiltCard } from '../components/TiltCard';

export const AboutPage: React.FC = () => {
  const [activeCaseTab, setActiveCaseTab] = useState<'problem' | 'strategy' | 'execution' | 'metrics'>('strategy');

  const steps = [
    {
      num: '01',
      title: 'Contextual Briefing',
      desc: 'Input your core product, audience nuance, primary channels, and brand tone. The engine maps market positioning vectors instantly.',
      icon: Target
    },
    {
      num: '02',
      title: 'Gemini AI Synthesis',
      desc: 'Our domain-tuned prompt architectures analyze consumer psychology, channel constraints, and organic reach patterns simultaneously.',
      icon: Cpu
    },
    {
      num: '03',
      title: 'Multi-Pillar Plan Output',
      desc: 'Receive 12 connected marketing deliverables: positioning, hook-based captions, slogans, 7-day calendar, budget, and KPI benchmarks.',
      icon: Layers
    },
    {
      num: '04',
      title: 'Iterate & Execute',
      desc: 'Edit cards on the fly, export pristine Markdown or JSON, regenerate components, or refine specifics via our micro-toolsuite.',
      icon: Rocket
    }
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'Zero Generic Fluff',
      desc: 'Trained to avoid hollow platitudes. Every headline, hook, and budget percentage is rooted in operational direct-to-consumer and B2B best practices.'
    },
    {
      icon: Target,
      title: 'Channel-Specific Formatting',
      desc: 'Instagram captions feature line-broken readability and carousel hooks; LinkedIn formats leverage whitespace and thought-leadership angles.'
    },
    {
      icon: BarChart3,
      title: 'Financial & Unit Discipline',
      desc: 'Budget recommendations and KPI metrics prioritize sustainable customer acquisition costs (CAC) rather than meaningless vanity numbers.'
    },
    {
      icon: ShieldCheck,
      title: 'Client-Safe & Privacy First',
      desc: 'Campaign inputs are processed securely server-side with zero persistent tracking or data selling. You maintain 100% intellectual property of all outputs.'
    },
    {
      icon: Sparkles,
      title: 'Autonomous Micro-Tools',
      desc: 'Beyond full campaigns, execute single-task workflows: headline variations, buyer persona analysis, abandoned-cart sequences, and slogans.'
    },
    {
      icon: HeartHandshake,
      title: 'Built for High-Velocity Teams',
      desc: 'Engineered specifically for solo founders, student creators, boutique agency leads, and growth marketers who need speed without sacrificing taste.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6FF] pt-28 pb-24">
      <PageMeta 
        title="About & Architecture — MarketMate.AI"
        description="Learn about the mission, engineering philosophy, and real-world results behind MarketMate.AI — the AI-powered marketing copilot for builders."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 text-violet-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-200/60">
            <Lightbulb className="w-3.5 h-3.5 text-violet-600" />
            Our Mission & Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#21113D] tracking-tight leading-tight">
            Democratizing Marketing Intelligence for Every Builder.
          </h1>
          <p className="mt-5 text-lg text-slate-600 leading-relaxed">
            MarketMate.AI was born out of a simple observation: extraordinary products fail every day not because the product is weak, but because marketing strategy was fragmented, expensive, or paralyzingly slow.
          </p>
        </div>

        {/* Vision Narrative Card */}
        <div className="mb-20 bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-50/70 rounded-full blur-3xl -z-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                The Core Insight
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#21113D] mt-4 mb-4">
                Strategy shouldn't cost $15,000 and 4 weeks of agency billable hours.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Early-stage founders and creators don't need generic AI text generators that spit out repetitive clichés like "Are you ready to elevate your brand?". They need cohesive, tactical architectures that connect <span className="font-semibold text-slate-900">audience psychology</span> to <span className="font-semibold text-slate-900">scroll-stopping hooks</span>, <span className="font-semibold text-slate-900">sensible channel budgets</span>, and <span className="font-semibold text-slate-900">concrete conversion metrics</span>.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                MarketMate.AI combines modern LLM reasoning with proven growth marketing frameworks (AIDA, PAS, StoryBrand, and Direct-Response copywriting) to produce 12-pillar campaign plans in under 15 seconds.
              </p>
            </div>

            <div className="bg-[#21113D] rounded-2xl p-6 sm:p-8 text-white relative shadow-lg">
              <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-xl bg-black/70 border border-[#7138D8]/50 flex items-center justify-center p-1 shadow-md overflow-hidden shrink-0">
                  <img
                    src="/assets/aistudio/Purple_Grunge_Respawn_Lab_Logo_9f1cceeb.png"
                    alt="MarketMate.AI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-tight">The MarketMate Advantage</div>
                  <div className="text-violet-300 text-[11px] font-mono">12-Pillar Marketing Intelligence</div>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-white">Full-Stack Synthesis:</span>
                    <p className="text-xs text-violet-200/80 mt-0.5">Not just isolated captions, but a cohesive 12-pillar go-to-market plan.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-white">Direct-Response Rigor:</span>
                    <p className="text-xs text-violet-200/80 mt-0.5">Captions separated into Hook, Body Storytelling, and Call-to-Action.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sm text-white">Instant Export & Edit:</span>
                    <p className="text-xs text-violet-200/80 mt-0.5">Markdown and JSON export for Notion, Slack, and your team's project boards.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Steps How It Works */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#21113D]">How The Engine Operates</h2>
            <p className="mt-2 text-sm text-slate-600">
              A transparent, 4-step pipeline designed for precision and actionable clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => {
              const Icon = st.icon;
              return (
                <div 
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm relative group hover:border-violet-300 transition-all hover:shadow-md"
                >
                  <div className="text-3xl font-black text-violet-200 group-hover:text-violet-600 transition-colors mb-4">
                    {st.num}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#21113D] mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#21113D]">Why Builders Choose MarketMate</h2>
            <p className="mt-2 text-sm text-slate-600">
              Architectural principles that ensure every output is production-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <TiltCard key={idx} maxTilt={6}>
                  <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-purple-100 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center mb-5">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#21113D] mb-2">{pil.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pil.desc}</p>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* Case Study: AuraHealth Smart Ring */}
        <div className="mb-20 bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-100">
                Real-World Application
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#21113D] mt-2">
                Case Study: AuraHealth Smart Ring
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                How a high-growth wellness wearable brand used MarketMate to launch their flagship recovery ring.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(['problem', 'strategy', 'execution', 'metrics'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCaseTab(tab)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all ${
                    activeCaseTab === tab 
                      ? 'bg-white text-violet-700 shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#F8F6FF] border border-purple-100/70">
            {activeCaseTab === 'problem' && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-[#21113D]">The Challenge</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  AuraHealth developed an aerospace-grade titanium smart ring with medical-precision sleep sensors, but struggled to articulate their value proposition against commoditized smartwatches. Their initial messaging was overly technical, resulting in poor traffic conversion.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Initial Problem</span>
                    <span className="text-xs font-bold text-red-600">Overly technical sensor jargon</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Old CAC</span>
                    <span className="text-xs font-bold text-red-600">$58.00 on cold ads</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Weekly Planning Time</span>
                    <span className="text-xs font-bold text-amber-600">18 hours lost in guesswork</span>
                  </div>
                </div>
              </div>
            )}

            {activeCaseTab === 'strategy' && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-[#21113D]">The MarketMate Strategy</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  MarketMate generated the core positioning angle: <strong>"Quiet Intelligence for Peak Recovery"</strong> targeting screen-fatigued professionals and biohackers. It structured a 4-part multi-channel video rotation (Aerospace Teardown, Sleep Science Comparisons, 7-Day Battery Trials, Unboxing Reviews).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">USP Defined</span>
                    <span className="text-xs font-bold text-violet-700">Screen-free titanium recovery tracking</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Hero Hook</span>
                    <span className="text-xs font-bold text-violet-700">"Your watch wakes you with emails. This ring wakes you with recovery data."</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Strategy Generation Time</span>
                    <span className="text-xs font-bold text-emerald-600">Under 18 seconds</span>
                  </div>
                </div>
              </div>
            )}

            {activeCaseTab === 'execution' && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-[#21113D]">Execution & Launch</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Using MarketMate's exact caption formulas and 7-day content schedule, AuraHealth filmed 12 high-contrast product reels, seeded rings to 25 certified sleep specialists, and launched an interactive sizing kit reservation flow.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Lead Channel</span>
                    <span className="text-xs font-bold text-slate-800">Instagram Reels & YouTube Tech Reviews</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Content Produced</span>
                    <span className="text-xs font-bold text-slate-800">18 high-performing assets in 72 hours</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Ad Spend Saved</span>
                    <span className="text-xs font-bold text-emerald-600">$5,400 vs agency quote</span>
                  </div>
                </div>
              </div>
            )}

            {activeCaseTab === 'metrics' && (
              <div className="space-y-3">
                <h4 className="text-base font-bold text-[#21113D]">30-Day Launch Metrics</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  AuraHealth achieved a 3.8x return on ad spend and converted 84% of sizing kit orders into full hardware purchases with an unprecedented low return rate.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Blended CAC</span>
                    <span className="text-sm font-extrabold text-emerald-600">$22.40 (down 61%)</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Launch Orders</span>
                    <span className="text-sm font-extrabold text-violet-700">1,240 Backers</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Email Conversion</span>
                    <span className="text-sm font-extrabold text-slate-900">5.4% Checkout Rate</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-purple-100">
                    <span className="text-[11px] text-slate-500 block">Repeat Order Rate</span>
                    <span className="text-sm font-extrabold text-emerald-600">31% within 60 Days</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#21113D] via-[#351A61] to-[#7138D8] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Ready to architect your next marketing breakthrough?
            </h2>
            <p className="text-sm sm:text-base text-violet-100/90 mb-8">
              Join thousands of students, startup founders, and brand owners turning ideas into actionable campaigns.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/campaign-planner"
                className="px-6 py-3 rounded-xl bg-white text-violet-900 font-bold text-sm shadow-md hover:bg-violet-50 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-violet-600" />
                Launch Campaign Planner
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
