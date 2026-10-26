import React, { useState } from 'react';
import { Sparkles, Calendar, Hash, MessageSquare, ArrowRight, Eye, Check } from 'lucide-react';
import { BISKIFY_SAMPLE } from '../data/sampleData';

interface SampleShowcaseProps {
  onLoadSample: () => void;
}

export const SampleShowcase: React.FC<SampleShowcaseProps> = ({ onLoadSample }) => {
  const [activeTab, setActiveTab] = useState<'slogan' | 'caption' | 'calendar' | 'hashtags'>('caption');

  return (
    <section id="sample" className="py-20 bg-purple-50/50 border-t border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-purple-200/80 p-6 sm:p-10 lg:p-12 shadow-xl shadow-[#7138D8]/5">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-purple-100">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#7138D8] bg-[#7138D8]/10 px-3 py-1 rounded-full mb-2">
                <span>Sample Campaign Showcase</span>
                <span>·</span>
                <span>Fictional Brand Study</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#21113D] tracking-tight">
                Case Study: Biskify Artisanal Cookies
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl leading-relaxed">
                See how a direct-to-consumer specialty cookie brand turns a simple ingredient brief into a cohesive multi-channel marketing campaign plan.
              </p>
            </div>

            <button
              onClick={onLoadSample}
              className="bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-95 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Eye className="w-4 h-4" />
              <span>Load Full Biskify Campaign</span>
            </button>
          </div>

          {/* Interactive Showcase Tabs */}
          <div className="pt-8">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                { id: 'caption', label: 'Sample Instagram Caption', icon: MessageSquare },
                { id: 'slogan', label: 'Campaign Slogan & Theme', icon: Sparkles },
                { id: 'calendar', label: 'Weekly Content Plan', icon: Calendar },
                { id: 'hashtags', label: 'Curated Hashtags', icon: Hash },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-[#7138D8] text-white shadow-xs'
                        : 'bg-[#F8F6FF] text-[#21113D] hover:bg-purple-100/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="bg-[#F8F6FF] rounded-2xl p-6 sm:p-8 border border-purple-100">
              {activeTab === 'caption' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-bold text-[#7138D8] uppercase tracking-wider">
                      Targeted Objective: Brand Discovery & Awareness
                    </span>
                    <span className="bg-purple-200/60 text-[#21113D] font-mono px-2 py-0.5 rounded text-[11px]">
                      Platform: Instagram
                    </span>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-purple-100 space-y-3">
                    <p className="text-sm sm:text-base font-bold text-[#21113D] leading-snug">
                      "{BISKIFY_SAMPLE.captions[0].hook}"
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {BISKIFY_SAMPLE.captions[0].body}
                    </p>
                    <div className="pt-2 border-t border-purple-50 text-xs font-semibold text-[#7138D8]">
                      👉 {BISKIFY_SAMPLE.captions[0].callToAction}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'slogan' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-purple-100 space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      Core Campaign Theme
                    </span>
                    <p className="text-lg font-bold text-[#21113D]">
                      {BISKIFY_SAMPLE.themeAndSlogan.theme}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Positions artisanal snacking as an intentional mental pause during intense workdays.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-purple-100 space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                      Brand Slogan & Punchline
                    </span>
                    <p className="text-xl font-extrabold text-[#7138D8]">
                      "{BISKIFY_SAMPLE.themeAndSlogan.slogan}"
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Highlighting grass-fed butter purity without artificial additives or preservatives.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Sample 4-Day Launch Sprint
                  </span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {BISKIFY_SAMPLE.contentCalendar.slice(0, 4).map((slot, i) => (
                      <div key={i} className="bg-white p-4 rounded-xl border border-purple-100">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-[#7138D8]">{slot.day}</span>
                          <span className="text-[10px] bg-purple-100 text-[#21113D] px-2 py-0.5 rounded font-medium">
                            {slot.format}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed font-medium">
                          {slot.contentFocus}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'hashtags' && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                    Niche & Lifestyle Discovery Tags
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {BISKIFY_SAMPLE.hashtags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-white px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#7138D8] border border-purple-100 shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    Combines high-volume mindful lifestyle hashtags with micro-niche artisanal baking tags for maximum discovery.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom prompt to explore full 12 cards */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600 bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <span className="font-medium">
                Want to see the audience insights, budget breakdown, and 12-point matrix for Biskify?
              </span>
              <button
                onClick={onLoadSample}
                className="text-[#7138D8] hover:text-[#5f2bc0] font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span>Open in Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
