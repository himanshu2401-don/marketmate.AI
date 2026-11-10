import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Sparkles,
  Copy,
  CheckCircle2,
  Calendar,
  Hash,
  Share2,
  RefreshCw,
  Send,
  ArrowRight,
  Sliders,
  Check,
} from 'lucide-react';
import { PageMeta } from '../components/PageMeta';
import { useCampaign } from '../context/CampaignContext';
import { MICRO_TOOLS } from '../data/sampleData';

export const SocialContentPage: React.FC = () => {
  const { activePlan, hasApiKey } = useCampaign();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Micro-tool modal state
  const [activeModalTool, setActiveModalTool] = useState<string | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [toolOutput, setToolOutput] = useState('');
  const [isToolLoading, setIsToolLoading] = useState(false);
  const [toolCopied, setToolCopied] = useState(false);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(identifier);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleOpenTool = (toolTitle: string, initialText: string) => {
    setActiveModalTool(toolTitle);
    setToolInput(initialText || activePlan?.overview || '');
    setToolOutput('');
  };

  const handleRunTool = async () => {
    if (!activeModalTool || !toolInput.trim()) return;
    setIsToolLoading(true);
    setToolOutput('');

    try {
      const response = await fetch('/api/run-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: activeModalTool,
          context: toolInput,
        }),
      });

      const data = await response.json();
      setToolOutput(data.result || 'No output produced.');
    } catch (err: any) {
      setToolOutput(`Error: ${err.message || 'Failed to generate output.'}`);
    } finally {
      setIsToolLoading(false);
    }
  };

  // Social specific micro-tools
  const socialTools = MICRO_TOOLS.filter((t) =>
    ['caption', 'slogan', 'hashtag', 'calendar'].includes(t.id)
  );

  return (
    <div className="py-12">
      <PageMeta
        title="Social Content Studio — Captions, Slogans & Calendar"
        description="Craft scroll-stopping hooks, ready-to-use captions, curated hashtag sets, and multi-week posting cadences tailored to your audience."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>High-Conversion Content Studio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#21113D]">
            Social Content & Copy Engine
          </h1>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Generate platform-native content with psychological hooks, engaging storytelling bodies, direct calls-to-action, and structured publishing schedules.
          </p>
        </div>

        {/* Active Plan Context Banner */}
        <div className="bg-[#21113D] text-white p-5 sm:p-6 rounded-2xl mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#7138D8]/30 shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs text-purple-300 mb-1">
              <span className="font-semibold text-white">Active Brand Campaign:</span>
              <span className="bg-[#7138D8] px-2 py-0.5 rounded text-[11px] font-mono">
                {activePlan?.platform || 'Multi-platform'}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white">
              {activePlan?.businessName || 'AuraHealth Smart Ring'}
            </h2>
            <p className="text-xs text-purple-200 mt-0.5 line-clamp-1 max-w-xl">
              {activePlan?.overview || '4-week multi-channel marketing campaign'}
            </p>
          </div>

          <Link
            to="/campaign-planner"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sliders className="w-3.5 h-3.5 text-[#B8A0FF]" />
            <span>Switch or Edit Plan</span>
          </Link>
        </div>

        {/* 1. THREE READY-TO-USE SOCIAL CAPTIONS */}
        <section className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                Production-Ready Copy
              </span>
              <h2 className="text-2xl font-extrabold text-[#21113D]">
                Three Ready-to-Use Social Captions
              </h2>
            </div>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Optimized with Hook · Story Body · CTA
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {activePlan?.captions.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-[#7138D8]">
                    <span>Option 0{idx + 1}</span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${cap.hook}\n\n${cap.body}\n\n${cap.callToAction}`,
                          `soc-cap-${idx}`
                        )
                      }
                      className="text-gray-400 hover:text-[#7138D8] p-1 transition cursor-pointer"
                      title="Copy full caption"
                    >
                      {copiedKey === `soc-cap-${idx}` ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Hook */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      1. Opening Hook
                    </span>
                    <p className="text-sm font-bold text-[#21113D] leading-snug">
                      "{cap.hook}"
                    </p>
                  </div>

                  {/* Story Body */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      2. Value & Storytelling Body
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {cap.body}
                    </p>
                  </div>
                </div>

                {/* Call to action */}
                <div className="mt-5 pt-3 border-t border-purple-100">
                  <span className="text-[10px] uppercase font-bold text-[#7138D8] tracking-wider block mb-0.5">
                    3. Direct Action
                  </span>
                  <p className="text-xs font-semibold text-[#21113D]">
                    👉 {cap.callToAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BRAND SLOGAN, HASHTAGS & CREATIVE ANGLES */}
        <div className="grid md:grid-cols-12 gap-8 mb-14">
          {/* Brand Slogan */}
          <div className="md:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                  Brand Voice
                </span>
                <button
                  onClick={() =>
                    copyToClipboard(
                      `${activePlan?.themeAndSlogan.theme} — "${activePlan?.themeAndSlogan.slogan}"`,
                      'soc-slogan'
                    )
                  }
                  className="text-gray-400 hover:text-[#7138D8] p-1 cursor-pointer"
                  title="Copy Slogan"
                >
                  {copiedKey === 'soc-slogan' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="font-bold text-lg text-[#21113D] mb-3">Campaign Theme & Slogan</h3>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block mb-0.5">
                    Core Campaign Theme
                  </span>
                  <p className="text-sm font-bold text-[#21113D] bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                    {activePlan?.themeAndSlogan.theme}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block mb-0.5">
                    Hero Slogan
                  </span>
                  <p className="text-base font-extrabold text-[#7138D8] bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                    "{activePlan?.themeAndSlogan.slogan}"
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleOpenTool('Brand Slogan Creator', activePlan?.businessName || '')}
              className="mt-5 w-full py-2 rounded-xl border border-purple-200 text-xs font-bold text-[#7138D8] hover:bg-purple-50 transition cursor-pointer"
            >
              Generate Alternative Slogans
            </button>
          </div>

          {/* Curated Hashtags */}
          <div className="md:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                  Algorithmic Discovery
                </span>
                <button
                  onClick={() =>
                    copyToClipboard((activePlan?.hashtags || []).join(' '), 'soc-tags')
                  }
                  className="text-gray-400 hover:text-[#7138D8] p-1 cursor-pointer"
                  title="Copy all hashtags"
                >
                  {copiedKey === 'soc-tags' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <h3 className="font-bold text-lg text-[#21113D] mb-3">Suggested Hashtag Sets</h3>

              <div className="flex flex-wrap gap-2.5 mb-4">
                {activePlan?.hashtags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#F8F6FF] px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#7138D8] border border-purple-100 shadow-xs"
                  >
                    {tag.startsWith('#') ? tag : `#${tag}`}
                  </span>
                ))}
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                Combines high-volume community tags with niche branded discovery tags to maximize reach on Instagram and TikTok.
              </p>
            </div>

            <button
              onClick={() => handleOpenTool('Hashtag Suggestion Tool', activePlan?.industry || '')}
              className="mt-5 w-full py-2 rounded-xl border border-purple-200 text-xs font-bold text-[#7138D8] hover:bg-purple-50 transition cursor-pointer"
            >
              Explore Niche Hashtag Variations
            </button>
          </div>
        </div>

        {/* 3. STRATEGIC CONTENT CALENDAR */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm mb-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                Execution Cadence
              </span>
              <h2 className="text-2xl font-extrabold text-[#21113D]">
                Content Calendar Schedule
              </h2>
            </div>
            <button
              onClick={() =>
                copyToClipboard(
                  JSON.stringify(activePlan?.contentCalendar || [], null, 2),
                  'soc-cal'
                )
              }
              className="text-xs font-bold text-[#7138D8] hover:text-[#5f2bc0] flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'soc-cal' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copiedKey === 'soc-cal' ? 'Copied' : 'Copy Schedule'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-purple-100 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="pb-3">Cadence / Timing</th>
                  <th className="pb-3">Content Focus & Strategic Angle</th>
                  <th className="pb-3">Recommended Format</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {activePlan?.contentCalendar.map((slot, i) => (
                  <tr key={i} className="hover:bg-purple-50/40 transition">
                    <td className="py-3.5 font-bold text-[#7138D8] whitespace-nowrap">{slot.day}</td>
                    <td className="py-3.5 text-gray-800 pr-4 font-medium leading-relaxed">
                      {slot.contentFocus}
                    </td>
                    <td className="py-3.5 whitespace-nowrap">
                      <span className="bg-purple-100 text-[#21113D] font-semibold px-2.5 py-1 rounded-md text-[11px]">
                        {slot.format}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. DEDICATED SOCIAL MICRO-TOOLS GRID */}
        <section className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider block mb-1">
              On-Demand Social Engines
            </span>
            <h2 className="text-2xl font-extrabold text-[#21113D]">
              Specialist Social Copywriting Tools
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Click any tool below to generate fresh captions, brand slogans, hashtags, or posting calendars tailored to your prompt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {socialTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleOpenTool(tool.title, activePlan?.overview || '')}
                className="bg-white p-5 rounded-2xl border border-purple-100 hover:border-[#7138D8]/50 shadow-xs hover:shadow-lg transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#7138D8] flex items-center justify-center font-bold mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#21113D] mb-1">{tool.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-xs font-bold text-[#7138D8]">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Micro-Tool Modal */}
        {activeModalTool && (
          <div className="fixed inset-0 z-50 bg-[#21113D]/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalTool(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#7138D8] text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#21113D]">{activeModalTool}</h3>
                  <p className="text-xs text-gray-500">Targeted social media generation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Context / Prompt
                  </label>
                  <textarea
                    rows={3}
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    placeholder="Enter brand name, product specifics, or angle..."
                    className="w-full text-sm p-3.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8]"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleRunTool}
                  disabled={isToolLoading || !toolInput.trim()}
                  className="w-full bg-[#7138D8] hover:bg-[#5f2bc0] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isToolLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Synthesizing Copy...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Generate Asset</span>
                    </>
                  )}
                </button>

                {toolOutput && (
                  <div className="mt-4 p-4 rounded-xl bg-[#F8F6FF] border border-purple-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                        Result
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(toolOutput);
                          setToolCopied(true);
                          setTimeout(() => setToolCopied(false), 2000);
                        }}
                        className="text-xs text-[#7138D8] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {toolCopied ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{toolCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-800 whitespace-pre-line leading-relaxed font-sans bg-white p-3.5 rounded-xl border border-purple-100">
                      {toolOutput}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
