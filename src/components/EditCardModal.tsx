import React, { useState } from 'react';
import { X, Check, Save } from 'lucide-react';
import { CampaignPlan } from '../types';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardKey: keyof CampaignPlan | 'themeAndSlogan';
  cardTitle: string;
  plan: CampaignPlan;
  onSave: (updatedPlan: CampaignPlan) => void;
}

export const EditCardModal: React.FC<EditCardModalProps> = ({
  isOpen,
  onClose,
  cardKey,
  cardTitle,
  plan,
  onSave,
}) => {
  if (!isOpen) return null;

  // Local state based on card type
  const [textValue, setTextValue] = useState<string>(() => {
    const val = (plan as any)[cardKey];
    if (typeof val === 'string') return val;
    if (Array.isArray(val)) {
      if (typeof val[0] === 'string') return val.join('\n');
      return JSON.stringify(val, null, 2);
    }
    if (cardKey === 'themeAndSlogan') {
      return `${plan.themeAndSlogan.theme}\n---\n${plan.themeAndSlogan.slogan}`;
    }
    return JSON.stringify(val, null, 2);
  });

  const handleSave = () => {
    const updated = { ...plan };
    if (cardKey === 'overview' || cardKey === 'audienceInsights' || cardKey === 'usp') {
      (updated as any)[cardKey] = textValue.trim();
    } else if (cardKey === 'themeAndSlogan') {
      const parts = textValue.split('\n---');
      updated.themeAndSlogan = {
        theme: parts[0]?.trim() || plan.themeAndSlogan.theme,
        slogan: parts[1]?.trim() || plan.themeAndSlogan.slogan,
      };
    } else if (cardKey === 'contentIdeas' || cardKey === 'hashtags' || cardKey === 'channelRecommendations' || cardKey === 'budgetAllocation' || cardKey === 'kpis' || cardKey === 'nextSteps') {
      (updated as any)[cardKey] = textValue
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      try {
        (updated as any)[cardKey] = JSON.parse(textValue);
      } catch {
        // keep as is
      }
    }
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#21113D]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-purple-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 rounded-lg transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-[11px] font-bold text-[#7138D8] uppercase tracking-wider">
            Edit Campaign Section
          </span>
          <h3 className="text-xl font-bold text-[#21113D] mt-0.5">{cardTitle}</h3>
          <p className="text-xs text-gray-500 mt-1">
            Update the content below. Changes will reflect immediately across exports and views.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Content Value (One item per line for lists)
            </label>
            <textarea
              rows={8}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="w-full text-sm p-3.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#7138D8] font-mono leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl bg-[#7138D8] hover:bg-[#5f2bc0] text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Save Updates
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
