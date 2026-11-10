import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Target, 
  PieChart, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Sliders, 
  Compass, 
  FileText, 
  Mail, 
  ShieldCheck, 
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { PageMeta } from '../components/PageMeta';
import { TiltCard } from '../components/TiltCard';
import { ToolModal } from '../components/ToolModal';

export const GrowthStrategyPage: React.FC = () => {
  const { activePlan, formData, fillSampleDemo } = useCampaign();
  const [activeToolId, setActiveToolId] = useState<string | null>(null);

  // Fallback demo channels, budget, and kpis if no plan is generated yet
  const defaultChannels = [
    'Instagram (Visual Discovery & UGC): Hero product reveals, macro sensor teardowns, and creator collaborations focusing on recovery routines.',
    'YouTube / Long-form Tech Reviews (Authority): In-depth accuracy comparisons with medical sleep monitors, battery life stress tests, and unboxings.',
    'Direct Email & VIP Drops (Retention): Educational circadian rhythm newsletters, personalized sleep score reports, and sizing kit confirmations.',
    'Targeted Meta Retargeting Ads (Conversion): Dynamic product ads highlighting 7-day battery life, zero subscription fees, and 30-day trial guarantees.'
  ];

  const defaultBudget = [
    'Meta Paid Acquisition & Retargeting (40%): Targeting biohacking, smart wearable, and endurance fitness audiences',
    'Creator Gifting & Review Seeding (25%): Seeding rings to 35 niche health and longevity creators',
    'Content Production & Studio Renders (20%): High-res 3D industrial renders, macro video, and sleep science infographics',
    'Retention Software & Sizing Kit Fulfillment (15%): Automated onboarding flows, sizing kit dispatch, and VIP support'
  ];

  const defaultKpis = [
    'Blended Customer Acquisition Cost (CAC): Target < $24.00 across initial 60-day launch window',
    'Return On Ad Spend (ROAS): 3.6x benchmark target across remarketing audiences',
    'Sizing Kit-to-Purchase Conversion: 84% confirmation rate within 14 days of kit delivery',
    'Hardware Return Rate: < 3.2% through accurate sizing guidance and precision fit',
    'Average Order Value (AOV): $289.00 Ring + Charging Dock Bundle'
  ];

  const defaultNextSteps = [
    'Lock in industrial 3D packaging renders and 10 dynamic creator brief assets.',
    'Configure email welcome automation and early-bird reservation sizing flow.',
    'Launch Meta Top-of-Funnel video view test campaign at $50/day budget.',
    'Set up conversion tracking and sizing kit confirmation webhooks.',
    'Prepare launch day email broadcast and product drop announcement.'
  ];

  const brandName = activePlan?.businessName || formData.businessName || 'AuraHealth Smart Ring';
  const channels = activePlan?.channelRecommendations && activePlan.channelRecommendations.length > 0 
    ? activePlan.channelRecommendations 
    : defaultChannels;
  const budgetList = activePlan?.budgetAllocation && activePlan.budgetAllocation.length > 0 
    ? activePlan.budgetAllocation 
    : defaultBudget;
  const kpiList = activePlan?.kpis && activePlan.kpis.length > 0 
    ? activePlan.kpis 
    : defaultKpis;
  const nextStepsList = activePlan?.nextSteps && activePlan.nextSteps.length > 0 
    ? activePlan.nextSteps 
    : defaultNextSteps;

  const growthTools = [
    {
      id: 'strategy',
      title: 'Full Strategy Blueprint',
      desc: 'Formulate an end-to-end 90-day positioning, messaging, and go-to-market funnel tailored to your business model.',
      icon: Target,
      tag: 'Strategic Vision'
    },
    {
      id: 'persona',
      title: 'Customer Persona Builder',
      desc: 'Unpack demographic traits, psychological drivers, pain triggers, and media habits of high-value buyers.',
      icon: Layers,
      tag: 'Audience Insight'
    },
    {
      id: 'adcopy',
      title: 'Conversion Ad Copy Generator',
      desc: 'Craft punchy headline variations, primary text hooks, and CTAs structured for Meta and Google performance.',
      icon: TrendingUp,
      tag: 'Paid Performance'
    },
    {
      id: 'email',
      title: 'Nurture & Retention Sequence',
      desc: 'Generate high-converting email sequences: welcome drips, abandoned cart recovery, and product launch announcements.',
      icon: Mail,
      tag: 'Retention & LTV'
    },
    {
      id: 'productdesc',
      title: 'Value Proposition & Product Copy',
      desc: 'Transform raw features into irresistible consumer benefits, sensory descriptions, and guarantee hooks.',
      icon: FileText,
      tag: 'Conversion Rate'
    },
    {
      id: 'insights',
      title: 'KPI Benchmark Simulator',
      desc: 'Identify leading indicators, CAC/LTV targets, and milestone diagnostics to avoid premature marketing burnout.',
      icon: PieChart,
      tag: 'Metrics & Data'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F6FF] pt-28 pb-24">
      <PageMeta 
        title="Growth Strategy & Channel Funnels — MarketMate.AI"
        description="Data-informed marketing growth architectures, budget allocations, KPI benchmarks, and execution roadmaps for modern startups and businesses."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 text-violet-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-violet-200/60">
            <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
            Data-Informed Growth Architecture
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#21113D] tracking-tight">
                Growth Engine & Strategic Funnels
              </h1>
              <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                Actionable multi-channel blueprints, capital allocation matrices, and 72-hour execution roadmaps designed to maximize ROI and lower acquisition costs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/campaign-planner"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 text-white font-medium text-sm shadow-md hover:shadow-violet-300/50 hover:opacity-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Customize for Your Business
              </Link>
            </div>
          </div>
        </div>

        {/* Current Active Plan Notice or Demo Notice */}
        {!activePlan && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-900">
                  Previewing Reference Architecture: {brandName}
                </h4>
                <p className="text-xs text-amber-700 mt-0.5">
                  Showing an illustrative growth blueprint. Launch the Campaign Planner to synthesize a custom strategy tailored to your exact budget and audience.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={fillSampleDemo}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-900 transition-colors cursor-pointer"
              >
                Load Sample in Planner
              </button>
            </div>
          </div>
        )}

        {/* 4 Pillars of Growth Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Channel Recommendations (Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-50/70 rounded-full blur-3xl -z-10" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#21113D]">Priority Acquisition Channels</h3>
                    <p className="text-xs text-slate-500">Ranked by unit economics and brand relevance</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
                  {channels.length} Core Streams
                </span>
              </div>

              <div className="space-y-4">
                {channels.map((channelText, i) => {
                  const parts = channelText.split(':');
                  const channelTitle = parts.length > 1 ? parts[0] : `Channel ${i + 1}`;
                  const channelDetail = parts.length > 1 ? parts.slice(1).join(':') : channelText;

                  return (
                    <div 
                      key={i} 
                      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F8F6FF] to-white border border-purple-100/80 hover:border-violet-300 transition-all hover:shadow-sm group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <h4 className="text-sm font-bold text-[#21113D] group-hover:text-violet-700 transition-colors">
                            {channelTitle.trim()}
                          </h4>
                        </div>
                        <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          Priority Stream
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
                        {channelDetail.trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Steps: 72-Hour Execution Roadmap */}
            <div className="bg-[#21113D] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center text-violet-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">72-Hour Rapid Execution Plan</h3>
                    <p className="text-xs text-violet-200/70">Critical path actions to deploy before scaling</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-400/20 text-violet-200 border border-violet-400/30">
                  Sprint Phase
                </span>
              </div>

              <div className="space-y-3 relative z-10">
                {nextStepsList.map((step, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-md bg-violet-500/30 border border-violet-400/40 text-violet-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-violet-100/90 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget & KPIs (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Capital Allocation Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#21113D]">Budget Allocation</h3>
                    <p className="text-xs text-slate-500">Growth vs. retention split</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  Recommended Split
                </span>
              </div>

              <div className="space-y-4">
                {budgetList.map((budgetItem, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="text-xs font-bold text-[#21113D] mb-1">
                      {budgetItem}
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden mt-2">
                      <div 
                        className="h-full bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"
                        style={{ width: `${Math.max(25, 100 - i * 20)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Benchmarks Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                    <PieChart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#21113D]">KPI Success Benchmarks</h3>
                    <p className="text-xs text-slate-500">Measurable targets before scaling spend</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {kpiList.map((kpiText, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100/70 flex items-start gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-violet-600 mt-1.5 shrink-0" />
                    <p className="text-xs sm:text-sm font-medium text-[#21113D] leading-relaxed">
                      {kpiText}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Growth & Strategy AI Toolsuite */}
        <div className="mt-12 pt-12 border-t border-purple-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#21113D]">
              Autonomous Growth Micro-Tools
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Generate ad copy variations, write retention drips, or calculate benchmark metrics in seconds powered by Google Gemini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {growthTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <TiltCard key={tool.id} maxTilt={6}>
                  <div className="h-full p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                          {tool.tag}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#21113D] mb-1.5">{tool.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{tool.desc}</p>
                    </div>

                    <button
                      onClick={() => setActiveToolId(tool.id)}
                      className="mt-6 w-full py-2.5 px-4 rounded-xl bg-violet-50 hover:bg-violet-600 hover:text-white text-violet-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Run AI Generator</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for Standalone Tool Generation */}
      {activeToolId && (
        <ToolModal
          toolId={activeToolId}
          onClose={() => setActiveToolId(null)}
          defaultContext={
            formData.businessName 
              ? `${formData.businessName} - ${formData.productDescription} (Target: ${formData.targetAudience})`
              : 'AuraHealth Smart Ring - Aerospace titanium wellness wearable targeting high-performing professionals'
          }
        />
      )}
    </div>
  );
};
