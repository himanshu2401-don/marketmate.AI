import React, { useState } from 'react';
import {
  Download,
  Copy,
  CheckCircle2,
  Edit3,
  RefreshCw,
  Sparkles,
  FileText,
  DollarSign,
  TrendingUp,
  Target,
  Hash,
  Calendar,
  Layers,
  Share2,
  ArrowUpRight,
  Lightbulb,
  Check,
} from 'lucide-react';
import { CampaignPlan } from '../types';
import { EditCardModal } from './EditCardModal';

interface ResultsDashboardProps {
  plan: CampaignPlan;
  onUpdatePlan: (updated: CampaignPlan) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  plan,
  onUpdatePlan,
  onRegenerate,
  isRegenerating,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [editingModal, setEditingModal] = useState<{
    key: keyof CampaignPlan | 'themeAndSlogan';
    title: string;
  } | null>(null);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(identifier);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadMarkdown = () => {
    const md = `
# MarketMate.AI Campaign Strategy: ${plan.businessName}
*Generated on: ${new Date(plan.createdAt).toLocaleDateString()}*
*Platform: ${plan.platform || 'Multi-channel'} | Tone: ${plan.campaignTone || 'Strategic'}*

---

## 1. Executive Campaign Overview
${plan.overview}

## 2. Target Audience Insights
${plan.audienceInsights}

## 3. Unique Selling Proposition (USP)
> "${plan.usp}"

## 4. Campaign Theme & Slogan
- **Theme:** ${plan.themeAndSlogan.theme}
- **Slogan:** "${plan.themeAndSlogan.slogan}"

## 5. Social Media Content Ideas
${plan.contentIdeas.map((idea, i) => `${i + 1}. ${idea}`).join('\n')}

## 6. Ready-to-Use Social Captions
${plan.captions
  .map(
    (c, i) => `
### Caption Option 0${i + 1}
**Hook:** ${c.hook}

**Body:**
${c.body}

**Call to Action:** ${c.callToAction}
`
  )
  .join('\n---\n')}

## 7. Suggested Hashtags
${plan.hashtags.join(' ')}

## 8. Strategic Content Calendar
| Cadence / Day | Content Focus | Format |
|---|---|---|
${plan.contentCalendar.map((slot) => `| ${slot.day} | ${slot.contentFocus} | ${slot.format} |`).join('\n')}

## 9. Marketing Channel Recommendations
${plan.channelRecommendations.map((ch) => `- ${ch}`).join('\n')}

## 10. Budget Allocation Strategy
${plan.budgetAllocation && plan.budgetAllocation.length > 0 ? plan.budgetAllocation.map((b) => `- ${b}`).join('\n') : 'Lean organic bootstrapping'}

## 11. Key Performance Indicators (KPIs)
${plan.kpis.map((kpi) => `- ${kpi}`).join('\n')}

## 12. Recommended Next Steps
${plan.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---
*Created with MarketMate.AI — Marketing Engine*
`;

    const blob = new Blob([md.trim()], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${plan.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-campaign-plan.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${plan.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-campaign.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="dashboard" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner with Actions */}
      <div className="bg-[#21113D] text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl border border-[#7138D8]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-2">
            <span
              className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full ${
                plan.isSample ? 'bg-[#7138D8]/80 text-white' : 'bg-emerald-500/80 text-white'
              }`}
            >
              {plan.isSample ? 'Sample Demonstration' : 'Live Generated Plan'}
            </span>
            <span className="text-xs text-purple-200">
              Created {new Date(plan.createdAt).toLocaleDateString()}
            </span>
            {plan.platform && (
              <span className="text-xs text-[#B8A0FF] font-medium bg-white/10 px-2.5 py-0.5 rounded-md">
                {plan.platform}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {plan.businessName}
          </h2>
          <p className="text-sm text-purple-200/90 mt-1 max-w-2xl leading-relaxed">
            Full 12-section campaign blueprint. Every card can be copied, edited live, or exported as ready-to-share markdown.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
            title="Regenerate this campaign plan"
          >
            <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
            title="Download formatted Markdown file"
          >
            <Download className="w-4 h-4 text-[#B8A0FF]" />
            <span>Export (.MD)</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer"
            title="Download JSON structure"
          >
            <FileText className="w-4 h-4 text-[#B8A0FF]" />
            <span>JSON</span>
          </button>

          <button
            onClick={() => copyToClipboard(JSON.stringify(plan, null, 2), 'full-json')}
            className="bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
          >
            {copiedKey === 'full-json' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedKey === 'full-json' ? 'Copied Plan!' : 'Copy Plan'}</span>
          </button>
        </div>
      </div>

      {/* 12-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Campaign Overview */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                01. Strategic Brief
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingModal({ key: 'overview', title: 'Campaign Overview' })}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Edit overview"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(plan.overview, 'c1')}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Copy text"
                >
                  {copiedKey === 'c1' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-2">Campaign Overview</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{plan.overview}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: High-level narrative & alignment
          </div>
        </div>

        {/* Card 2: Target Audience Insights */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                02. Customer Persona
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingModal({ key: 'audienceInsights', title: 'Target Audience Insights' })}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Edit audience insights"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(plan.audienceInsights, 'c2')}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Copy text"
                >
                  {copiedKey === 'c2' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-2">Target Audience Insights</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{plan.audienceInsights}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Demographics, triggers & friction
          </div>
        </div>

        {/* Card 3: Unique Selling Proposition */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                03. Differentiation
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingModal({ key: 'usp', title: 'Unique Selling Proposition' })}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Edit USP"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(plan.usp, 'c3')}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Copy text"
                >
                  {copiedKey === 'c3' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-2">Unique Selling Proposition</h3>
            <div className="bg-[#F8F6FF] p-4 rounded-xl border border-purple-100 mt-2">
              <p className="text-sm text-[#21113D] font-medium italic leading-relaxed">
                "{plan.usp}"
              </p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Competitive edge & defensibility
          </div>
        </div>

        {/* Card 4: Campaign Theme and Slogan */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                04. Brand Voice
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingModal({ key: 'themeAndSlogan', title: 'Campaign Theme & Slogan' })}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Edit Theme & Slogan"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(`${plan.themeAndSlogan.theme} — ${plan.themeAndSlogan.slogan}`, 'c4')}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Copy text"
                >
                  {copiedKey === 'c4' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Theme & Slogan</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Creative Campaign Theme
                </span>
                <p className="text-sm font-bold text-[#21113D] bg-purple-50/60 p-2.5 rounded-lg border border-purple-100">
                  {plan.themeAndSlogan.theme}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold block mb-0.5">
                  Hero Brand Slogan
                </span>
                <p className="text-base font-extrabold text-[#7138D8] bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                  "{plan.themeAndSlogan.slogan}"
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Creative punchline & memorability
          </div>
        </div>

        {/* Card 5: Social Media Content Ideas */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                05. Creative Angles
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingModal({ key: 'contentIdeas', title: 'Content Ideas' })}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Edit ideas"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(plan.contentIdeas.join('\n'), 'c5')}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Copy all ideas"
                >
                  {copiedKey === 'c5' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Social Media Content Ideas</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {plan.contentIdeas.map((idea, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 bg-[#F8F6FF] p-3.5 rounded-xl border border-purple-100 text-xs sm:text-sm text-gray-800 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-md bg-[#7138D8] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{idea}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Engagement angles & storytelling hooks
          </div>
        </div>

        {/* Card 6: Three Ready-to-Use Social Captions */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                06. Ready-to-Use Copy
              </span>
              <h3 className="font-bold text-[#21113D] text-xl mt-0.5">Three Ready-to-Use Social Captions</h3>
            </div>
            <span className="text-xs text-gray-500 hidden sm:inline">
              Formulated with Hook, Storytelling Body & Call-to-Action
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {plan.captions.map((cap, idx) => (
              <div
                key={idx}
                className="bg-[#F8F6FF] rounded-2xl p-5 border border-purple-100 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#7138D8]">
                    <span>Caption Option 0{idx + 1}</span>
                    <button
                      onClick={() => copyToClipboard(`${cap.hook}\n\n${cap.body}\n\n${cap.callToAction}`, `cap-${idx}`)}
                      className="text-gray-400 hover:text-[#7138D8] p-1 transition"
                      title="Copy caption"
                    >
                      {copiedKey === `cap-${idx}` ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Hook */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      Opening Hook
                    </span>
                    <p className="text-sm font-bold text-[#21113D] leading-snug">
                      "{cap.hook}"
                    </p>
                  </div>

                  {/* Body */}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">
                      Story Body
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {cap.body}
                    </p>
                  </div>
                </div>

                {/* Call To Action */}
                <div className="pt-3 border-t border-purple-200/60">
                  <span className="text-[10px] uppercase font-bold text-[#7138D8] tracking-wider block mb-0.5">
                    Call To Action
                  </span>
                  <p className="text-xs font-semibold text-[#21113D]">
                    👉 {cap.callToAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 7: Suggested Hashtags */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                07. Search & Discovery
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEditingModal({ key: 'hashtags', title: 'Suggested Hashtags' })}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Edit hashtags"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => copyToClipboard(plan.hashtags.join(' '), 'c7')}
                  className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                  title="Copy all hashtags"
                >
                  {copiedKey === 'c7' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Suggested Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {plan.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs font-semibold bg-[#7138D8]/10 text-[#7138D8] hover:bg-[#7138D8]/20 px-3 py-1.5 rounded-lg transition"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Algorithmic distribution & organic SEO
          </div>
        </div>

        {/* Card 8: Strategic Content Calendar */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                08. Execution Cadence
              </span>
              <button
                onClick={() => copyToClipboard(JSON.stringify(plan.contentCalendar, null, 2), 'c8')}
                className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                title="Copy calendar JSON"
              >
                {copiedKey === 'c8' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Content Calendar Schedule</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-purple-100 text-gray-500 font-semibold">
                    <th className="pb-2.5 font-bold uppercase tracking-wider">Cadence</th>
                    <th className="pb-2.5 font-bold uppercase tracking-wider">Content Focus</th>
                    <th className="pb-2.5 font-bold uppercase tracking-wider">Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50">
                  {plan.contentCalendar.map((slot, i) => (
                    <tr key={i} className="hover:bg-purple-50/40 transition">
                      <td className="py-3 font-semibold text-[#7138D8] whitespace-nowrap">{slot.day}</td>
                      <td className="py-3 text-gray-800 pr-3">{slot.contentFocus}</td>
                      <td className="py-3 whitespace-nowrap">
                        <span className="bg-purple-100/80 text-[#21113D] font-medium px-2.5 py-1 rounded-md text-[11px]">
                          {slot.format}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Consistent multi-week publishing schedule
          </div>
        </div>

        {/* Card 9: Marketing Channel Recommendations */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                09. Distribution Hubs
              </span>
              <button
                onClick={() => copyToClipboard(plan.channelRecommendations.join('\n'), 'c9')}
                className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                title="Copy channels"
              >
                {copiedKey === 'c9' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Channel Recommendations</h3>
            <ul className="space-y-2.5 text-xs text-gray-700">
              {plan.channelRecommendations.map((ch, i) => (
                <li key={i} className="p-3 rounded-xl bg-[#F8F6FF] border border-purple-50 leading-relaxed font-medium">
                  {ch}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Omnichannel routing & touchpoints
          </div>
        </div>

        {/* Card 10: Budget Allocation Suggestions */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                10. Investment Architecture
              </span>
              <button
                onClick={() => copyToClipboard((plan.budgetAllocation || []).join('\n'), 'c10')}
                className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                title="Copy budget"
              >
                {copiedKey === 'c10' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Budget Allocation Suggestions</h3>
            {plan.budgetAllocation && plan.budgetAllocation.length > 0 ? (
              <ul className="space-y-2.5 text-xs text-gray-700">
                {plan.budgetAllocation.map((b, i) => (
                  <li key={i} className="p-3 rounded-xl bg-[#F8F6FF] border border-purple-50 flex items-start gap-2.5 leading-relaxed">
                    <DollarSign className="w-4 h-4 text-[#7138D8] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 rounded-xl bg-purple-50/50 text-xs text-gray-500 italic">
                No specific budget provided. Recommended strategy centers on organic growth, viral reels, and partner collaborations.
              </div>
            )}
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Spend allocation & resource distribution
          </div>
        </div>

        {/* Card 11: Key Performance Indicators to Monitor */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
                11. Performance Scorecard
              </span>
              <button
                onClick={() => copyToClipboard(plan.kpis.join('\n'), 'c11')}
                className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
                title="Copy KPIs"
              >
                {copiedKey === 'c11' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <h3 className="font-bold text-[#21113D] text-lg mb-3">Key Performance Indicators</h3>
            <ul className="space-y-2.5 text-xs text-gray-700">
              {plan.kpis.map((kpi, i) => (
                <li
                  key={i}
                  className="p-3 rounded-xl bg-emerald-50/70 text-emerald-950 border border-emerald-100 flex items-center gap-2.5 font-medium leading-relaxed"
                >
                  <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{kpi}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 text-[11px] text-gray-400">
            Pillar: Measurable milestones & validation
          </div>
        </div>

        {/* Card 12: Recommended Next Steps */}
        <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm hover:shadow-md transition md:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-50/40 via-white to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
              12. Action Matrix
            </span>
            <button
              onClick={() => copyToClipboard(plan.nextSteps.join('\n'), 'c12')}
              className="text-gray-400 hover:text-[#7138D8] p-1 rounded transition"
              title="Copy next steps"
            >
              {copiedKey === 'c12' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <h3 className="font-bold text-[#21113D] text-xl mb-4">Recommended Next Steps</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {plan.nextSteps.map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white border border-purple-100 shadow-xs flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-lg bg-[#7138D8] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {i + 1}
                </div>
                <p className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-purple-100 text-[11px] text-gray-400">
            Pillar: Immediate 72-hour launch checklist
          </div>
        </div>

      </div>

      {/* In-place Card Editor Modal */}
      {editingModal && (
        <EditCardModal
          isOpen={Boolean(editingModal)}
          onClose={() => setEditingModal(null)}
          cardKey={editingModal.key}
          cardTitle={editingModal.title}
          plan={plan}
          onSave={onUpdatePlan}
        />
      )}
    </section>
  );
};
