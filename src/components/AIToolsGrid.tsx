import React, { useState } from 'react';
import {
  Target,
  MessageSquare,
  Zap,
  Calendar,
  Sparkles,
  Hash,
  Users,
  Mail,
  FileText,
  BarChart3,
  ChevronRight,
  X,
  Copy,
  CheckCircle2,
  RefreshCw,
  Send,
  SlidersHorizontal,
} from 'lucide-react';
import { MICRO_TOOLS } from '../data/sampleData';
import { MicroTool } from '../types';

interface AIToolsGridProps {
  currentBriefText?: string;
  hasApiKey: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Target,
  MessageSquare,
  Zap,
  Calendar,
  Sparkles,
  Hash,
  Users,
  Mail,
  FileText,
  BarChart3,
};

export const AIToolsGrid: React.FC<AIToolsGridProps> = ({ currentBriefText, hasApiKey }) => {
  const [activeTool, setActiveTool] = useState<MicroTool | null>(null);
  const [toolInput, setToolInput] = useState('');
  const [toolOutput, setToolOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openTool = (tool: MicroTool) => {
    setActiveTool(tool);
    setToolInput(currentBriefText || '');
    setToolOutput('');
    setErrorMessage(null);
  };

  const handleGenerate = async () => {
    if (!activeTool || !toolInput.trim()) return;
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/run-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolName: activeTool.title,
          context: `${activeTool.promptTemplate}\n${toolInput}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'CONFIG_MISSING') {
          // Provide an intelligent context-grounded preview response
          setToolOutput(
            `[Demo Mode Preview — Live API Key Not Detected]\n\nGenerated output for ${activeTool.title}:\n\n` +
              `Based on: "${toolInput.slice(0, 120)}..."\n\n` +
              `1. Primary Angle: Focus on the visceral before-and-after outcome for your target user.\n` +
              `2. Core Hook: "Stop settling for standard solutions. Experience the difference engineered for your daily routine."\n` +
              `3. Platform Tactic: Publish high-contrast video reels showing the exact moment of value delivery, supported by a clear bio link CTA.\n\n` +
              `💡 Configure GEMINI_API_KEY in your server environment to enable unbounded real-time generation.`
          );
          return;
        }
        throw new Error(data.message || 'Tool generation failed.');
      }

      setToolOutput(data.result);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while generating copy.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!toolOutput) return;
    navigator.clipboard.writeText(toolOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Standalone Micro-Engines</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#21113D]">
          Modular AI Marketing Tools
        </h2>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Need a specific asset without running a full campaign sprint? Launch any specialist engine below to create captions, slogans, ad copy, or personas on demand.
        </p>
      </div>

      {/* Grid of 10 micro-tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {MICRO_TOOLS.map((tool) => {
          const Icon = ICON_MAP[tool.icon] || Sparkles;
          return (
            <div
              key={tool.id}
              onClick={() => openTool(tool)}
              className="group bg-white p-5 rounded-2xl border border-purple-100 hover:border-[#7138D8]/60 shadow-xs hover:shadow-xl hover:shadow-[#7138D8]/10 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-purple-50 group-hover:bg-[#7138D8] text-[#7138D8] group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-[#21113D] group-hover:text-[#7138D8] transition-colors mb-1.5">
                  {tool.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-xs font-semibold text-[#7138D8]">
                <span>Launch Tool</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Micro-Tool Modal */}
      {activeTool && (
        <div className="fixed inset-0 z-50 bg-[#21113D]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-lg transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#7138D8] text-white flex items-center justify-center shadow-md">
                {React.createElement(ICON_MAP[activeTool.icon] || Sparkles, {
                  className: 'w-6 h-6',
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#21113D]">{activeTool.title}</h3>
                <p className="text-xs text-gray-500">{activeTool.desc}</p>
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Input Context / Product Brief
                </label>
                <textarea
                  rows={4}
                  placeholder={activeTool.placeholder}
                  value={toolInput}
                  onChange={(e) => setToolInput(e.target.value)}
                  className="w-full text-sm p-3.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] leading-relaxed"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  {errorMessage}
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !toolInput.trim()}
                className={`w-full bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-98 text-white py-3 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  isGenerating || !toolInput.trim() ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Asset</span>
                  </>
                )}
              </button>

              {/* Output Display */}
              {toolOutput && (
                <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-[#F8F6FF] border border-purple-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                      Generated Result
                    </span>
                    <button
                      onClick={handleCopy}
                      className="text-xs text-[#7138D8] hover:text-[#5f2bc0] font-semibold flex items-center gap-1.5 bg-white px-3 py-1 rounded-lg border border-purple-200 shadow-xs cursor-pointer"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed font-sans bg-white p-4 rounded-xl border border-purple-100">
                    {toolOutput}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
