import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Check,
  Info,
  DollarSign,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { CampaignFormState, CampaignPlan } from '../types';
import { BISKIFY_SAMPLE } from '../data/sampleData';

interface CampaignEngineProps {
  formData: CampaignFormState;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormState>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  errorMessage: string | null;
  onLoadSample: () => void;
  hasApiKey: boolean;
}

export const CampaignEngine: React.FC<CampaignEngineProps> = ({
  formData,
  setFormData,
  onSubmit,
  isLoading,
  errorMessage,
  onLoadSample,
  hasApiKey,
}) => {
  const [fillToast, setFillToast] = useState(false);

  const fillWithBiskify = () => {
    setFormData({
      businessName: 'Biskify Artisanal Cookies',
      productDescription:
        'Micro-batch cookies slow-baked with 100% grass-fed churned butter, single-origin 70% dark chocolate chunks, and unrefined demerara crystals. Clean label indulgence with zero palm oil.',
      industry: 'Specialty Confectionery & Food DTC',
      targetAudience:
        'Young urban professionals and remote hybrid workers (ages 23–40) struggling with 3 PM screen fatigue, looking for wholesome yet indulgent mindful snack rituals.',
      marketingObjective: 'Brand Awareness & Discovery',
      platform: 'Instagram',
      campaignTone: 'Creative',
      budget: '$1,500 total ($375/week)',
      duration: '4 Weeks',
    });
    setFillToast(true);
    setTimeout(() => setFillToast(false), 2500);
  };

  return (
    <section id="engine-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
          <Sliders className="w-3.5 h-3.5" />
          <span>Interactive Campaign Generator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#21113D]">
          Design Your Complete Marketing Blueprint
        </h2>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Provide your business concept, target customer, and marketing goals. MarketMate.AI transforms them into an actionable 12-pillar campaign strategy.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-[#7138D8]/5 border border-purple-100 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#21113D] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
            </div>
            <span className="text-xs font-mono text-purple-200">
              campaign-generation-engine // gemini-3.8-flash
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fillWithBiskify}
              className="text-xs bg-[#7138D8]/40 hover:bg-[#7138D8] text-[#B8A0FF] hover:text-white px-3.5 py-1.5 rounded-lg border border-[#7138D8]/50 transition-colors cursor-pointer flex items-center gap-1.5 font-medium"
            >
              {fillToast ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{fillToast ? 'Form Filled!' : 'Auto-fill Demo Brief'}</span>
            </button>
          </div>
        </div>

        {/* API Key notice banner if not configured */}
        {!hasApiKey && (
          <div className="bg-purple-50 border-b border-purple-100 px-6 sm:px-8 py-3 text-xs text-purple-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#7138D8] shrink-0" />
              <span>
                <strong>Live AI Mode Available:</strong> Add <code className="bg-purple-100 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY</code> to your environment for real-time live synthesis, or explore with our built-in sample data engine.
              </span>
            </div>
            <button
              onClick={onLoadSample}
              className="font-semibold text-[#7138D8] hover:underline underline-offset-2 shrink-0 ml-2"
            >
              View Sample Plan →
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={onSubmit} className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Business Name */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Business or Brand Name <span className="text-[#7138D8]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lumina Ergonomic Desk Lamps"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
              />
            </div>

            {/* 2. Industry or Niche */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Industry or Niche <span className="text-[#7138D8]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sustainable Home Office & Productivity Gear"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
              />
            </div>

            {/* 3. Product Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Product or Service Description <span className="text-[#7138D8]">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe what you sell, its key features, material or process, and the core problem it solves..."
                value={formData.productDescription}
                onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white leading-relaxed"
              />
            </div>

            {/* 4. Target Audience */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Target Audience <span className="text-[#7138D8]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Remote software developers and architects aged 25-45"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
              />
            </div>

            {/* 5. Marketing Objective */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Marketing Objective <span className="text-[#7138D8]">*</span>
              </label>
              <select
                value={formData.marketingObjective}
                onChange={(e) => setFormData({ ...formData, marketingObjective: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
              >
                <option value="Brand Awareness & Discovery">Brand Awareness & Discovery</option>
                <option value="Product Launch & Early Bird Sales">Product Launch & Early Bird Sales</option>
                <option value="Lead Generation & Email List Growth">Lead Generation & Email List Growth</option>
                <option value="Community Engagement & Social Following">Community Engagement & Social Following</option>
                <option value="Direct E-Commerce Conversions & ROAS">Direct E-Commerce Conversions & ROAS</option>
              </select>
            </div>

            {/* 6. Preferred Platform */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Preferred Platform <span className="text-[#7138D8]">*</span>
              </label>
              <select
                value={formData.platform}
                onChange={(e: any) => setFormData({ ...formData, platform: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
              >
                <option value="Instagram">Instagram (Reels, Carousels, Stories)</option>
                <option value="LinkedIn">LinkedIn (Thought Leadership & B2B)</option>
                <option value="Facebook">Facebook (Communities & Video Ads)</option>
                <option value="YouTube">YouTube (Shorts & Longform Guides)</option>
                <option value="Website">Website / Blog / Email Newsletter</option>
              </select>
            </div>

            {/* 7. Campaign Tone */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Campaign Tone <span className="text-[#7138D8]">*</span>
              </label>
              <select
                value={formData.campaignTone}
                onChange={(e: any) => setFormData({ ...formData, campaignTone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
              >
                <option value="Professional">Professional & Authoritative</option>
                <option value="Creative">Creative & Inspiring</option>
                <option value="Friendly">Friendly & Approachable</option>
                <option value="Premium">Premium & Sophisticated</option>
                <option value="Playful">Playful & Quirky</option>
              </select>
            </div>

            {/* 8. Budget Range (Optional) */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Budget Range <span className="text-xs font-normal text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. $1,000 – $2,500 total, or $30/day"
                  value={formData.budget || ''}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
                />
              </div>
            </div>

            {/* 9. Campaign Duration (Optional) */}
            <div>
              <label className="block text-sm font-bold text-[#21113D] mb-2">
                Campaign Duration <span className="text-xs font-normal text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="e.g. 2 Weeks, 30 Days, or 1 Quarter"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] focus:border-transparent transition text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-amber-950">Notice</p>
                <p className="text-xs sm:text-sm leading-relaxed">{errorMessage}</p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onLoadSample}
                    className="text-xs font-bold text-[#7138D8] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    Load Biskify Sample Campaign instead <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Form Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-100">
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7138D8]" />
              <span>Server-side AI synthesis · No secrets exposed to client</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onLoadSample}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-purple-200 hover:bg-purple-50 text-[#7138D8] font-semibold text-sm transition cursor-pointer text-center"
              >
                Explore Sample Plan
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-98 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-[#7138D8]/30 hover:shadow-xl hover:shadow-[#7138D8]/50 transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  isLoading ? 'opacity-80 cursor-wait' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Strategy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Marketing Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
