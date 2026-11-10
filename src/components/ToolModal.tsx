import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Copy, 
  Check, 
  Send, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { MICRO_TOOLS } from '../data/sampleData';
import { MicroTool } from '../types';

interface ToolModalProps {
  toolId: string;
  onClose: () => void;
  defaultContext?: string;
}

export const ToolModal: React.FC<ToolModalProps> = ({ toolId, onClose, defaultContext }) => {
  const tool: MicroTool = MICRO_TOOLS.find((t) => t.id === toolId) || {
    id: toolId,
    title: 'AI Marketing Assistant',
    desc: 'Autonomous marketing generation powered by Gemini.',
    icon: 'Sparkles',
    promptTemplate: 'Generate high-impact marketing assets for: {{input}}',
    placeholder: 'Enter your brand brief or question...'
  };

  const [input, setInput] = useState(defaultContext || '');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Please provide some context or instructions.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/run-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: tool.id,
          prompt: input
        })
      });

      const data = await res.json();
      if (!res.ok && !data.result) {
        throw new Error(data.message || 'Generation failed.');
      }

      setOutput(data.result || data.message || 'Complete.');
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21113D]/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-modal-title"
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#21113D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/40 border border-violet-400/30 flex items-center justify-center text-violet-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="tool-modal-title" className="text-base font-bold text-white">
                {tool.title}
              </h3>
              <p className="text-xs text-violet-200/80">
                {tool.desc}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-violet-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Input Context / Instructions
            </label>
            <textarea
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.placeholder || 'Describe what you need...'}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating with Gemini...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Generate Output</span>
                </>
              )}
            </button>
          </div>

          {output && (
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#21113D] uppercase tracking-wider">
                  AI Generated Result
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-violet-100 text-slate-700 hover:text-violet-800 text-xs font-semibold transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto font-sans">
                {output}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Powered by Google Gemini 2.5 Flash
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
