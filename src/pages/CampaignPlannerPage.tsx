import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Sparkles, Sliders, ArrowRight, Layers, MessageSquare, TrendingUp, RefreshCw } from 'lucide-react';
import { CampaignEngine } from '../components/CampaignEngine';
import { ResultsDashboard } from '../components/ResultsDashboard';
import { PageMeta } from '../components/PageMeta';
import { useCampaign } from '../context/CampaignContext';

export const CampaignPlannerPage: React.FC = () => {
  const {
    formData,
    setFormData,
    activePlan,
    isLoading,
    isRegenerating,
    errorMessage,
    hasApiKey,
    generateCampaign,
    regenerateCampaign,
    loadSample,
    updatePlan,
  } = useCampaign();

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    const success = await generateCampaign(e);
    if (success) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <div className="py-12">
      <PageMeta
        title="Campaign Planner — 12-Pillar Marketing Architecture"
        description="Synthesize your business or product brief into a tailored 12-pillar campaign strategy with audience insights, USPs, ready captions, and content calendar."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Multi-Channel Campaign Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#21113D]">
            AI Campaign Strategy Planner
          </h1>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Provide your business brief below. MarketMate.AI transforms your product vision, target audience, and marketing objectives into a complete 12-pillar launch roadmap.
          </p>
        </div>

        {/* Campaign Input Engine Form */}
        <div className="mb-14">
          <CampaignEngine
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onLoadSample={loadSample}
            hasApiKey={hasApiKey}
          />
        </div>

        {/* 12-Card Results Dashboard */}
        <div ref={resultsRef}>
          {activePlan && (
            <div className="space-y-8">
              <ResultsDashboard
                plan={activePlan}
                onUpdatePlan={updatePlan}
                onRegenerate={regenerateCampaign}
                isRegenerating={isRegenerating}
              />

              {/* Next Feature Navigation Banner */}
              <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 rounded-2xl p-6 sm:p-8 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-[#21113D]">
                    Ready to deep-dive into Social Copy or Multi-Channel Growth?
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Your generated campaign strategy is synced across the Social Content Studio and Growth Strategy engines.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to="/social-content"
                    className="px-4 py-2.5 rounded-xl bg-white border border-purple-200 text-xs font-bold text-[#7138D8] hover:bg-purple-50 transition flex items-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Social Studio</span>
                  </Link>

                  <Link
                    to="/growth-strategy"
                    className="px-4 py-2.5 rounded-xl bg-[#7138D8] text-white text-xs font-bold hover:bg-[#5f2bc0] transition flex items-center gap-1.5 shadow-sm"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Growth Strategy</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
