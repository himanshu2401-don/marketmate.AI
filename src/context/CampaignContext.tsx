import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampaignFormState, CampaignPlan } from '../types';
import { SAMPLE_CAMPAIGN } from '../data/sampleData';

interface CampaignContextType {
  formData: CampaignFormState;
  setFormData: React.Dispatch<React.SetStateAction<CampaignFormState>>;
  activePlan: CampaignPlan | null;
  setActivePlan: React.Dispatch<React.SetStateAction<CampaignPlan | null>>;
  savedCampaigns: CampaignPlan[];
  isLoading: boolean;
  isRegenerating: boolean;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  hasApiKey: boolean;
  generateCampaign: (e?: React.FormEvent) => Promise<boolean>;
  regenerateCampaign: () => Promise<void>;
  loadSample: () => void;
  updatePlan: (updated: CampaignPlan) => void;
  fillSampleDemo: () => void;
}

const defaultFormData: CampaignFormState = {
  businessName: '',
  productDescription: '',
  industry: '',
  targetAudience: '',
  marketingObjective: 'Brand Awareness & Discovery',
  platform: 'Instagram',
  campaignTone: 'Creative',
  budget: '',
  duration: '',
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<CampaignFormState>(defaultFormData);
  const [activePlan, setActivePlan] = useState<CampaignPlan | null>(null);
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Check backend server config on mount
  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasApiKey === 'boolean') {
          setHasApiKey(data.hasApiKey);
        }
      })
      .catch(() => {
        // Fallback
      });
  }, []);

  // Load saved campaigns from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('marketmate_saved_campaigns');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedCampaigns(parsed);
          // If no active plan, default to the most recent saved one or sample
          if (!activePlan) {
            setActivePlan(parsed[0]);
          }
        }
      } else {
        // Default to sample campaign so pages have rich content from the start
        setActivePlan(SAMPLE_CAMPAIGN);
      }
    } catch {
      setActivePlan(SAMPLE_CAMPAIGN);
    }
  }, []);

  const saveCampaignToStorage = (plan: CampaignPlan) => {
    try {
      const existing = savedCampaigns.filter((p) => p.id !== plan.id);
      const updated = [plan, ...existing].slice(0, 10);
      setSavedCampaigns(updated);
      localStorage.setItem('marketmate_saved_campaigns', JSON.stringify(updated));
    } catch {
      // LocalStorage guard
    }
  };

  const fillSampleDemo = () => {
    setFormData({
      businessName: 'AuraHealth Smart Ring',
      productDescription:
        'Aerospace-grade titanium smart ring delivering medical-grade biometrics, sleep recovery tracking, and 7-day battery life with zero subscription fees.',
      industry: 'Health Tech & Wearable Wellness DTC',
      targetAudience:
        'Active professionals, endurance athletes, and wellness enthusiasts (ages 24–45) seeking continuous circadian and HRV recovery metrics without screen distraction.',
      marketingObjective: 'Brand Awareness & Discovery',
      platform: 'Instagram',
      campaignTone: 'Premium',
      budget: '$2,500 total ($625/week)',
      duration: '4 Weeks',
    });
  };

  const loadSample = () => {
    setActivePlan(SAMPLE_CAMPAIGN);
    fillSampleDemo();
    setErrorMessage(null);
  };

  const updatePlan = (updated: CampaignPlan) => {
    setActivePlan(updated);
    saveCampaignToStorage(updated);
  };

  const generateCampaign = async (e?: React.FormEvent): Promise<boolean> => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    if (!formData.businessName.trim()) {
      setErrorMessage('Please enter your business or brand name.');
      return false;
    }
    if (!formData.productDescription.trim()) {
      setErrorMessage('Please provide a brief product or service description.');
      return false;
    }
    if (!formData.targetAudience.trim()) {
      setErrorMessage('Please define your target audience.');
      return false;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.isFallback || !response.ok) {
        setErrorMessage(
          data.message ||
            'Notice: Live API generation requires billing or an active API key. Loaded the complete interactive demonstration campaign so you can explore all 12 cards, live editing, and exports.'
        );
        setActivePlan(SAMPLE_CAMPAIGN);
        return true;
      }

      setActivePlan(data);
      saveCampaignToStorage(data);
      return true;
    } catch (err: any) {
      setErrorMessage(
        err.message || 'An unexpected error occurred during generation. Please check inputs and try again.'
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateCampaign = async () => {
    if (!activePlan) return;
    setIsRegenerating(true);

    try {
      const response = await fetch('/api/generate-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: activePlan.businessName,
          productDescription: formData.productDescription || activePlan.overview,
          industry: activePlan.industry || formData.industry || 'General',
          targetAudience: activePlan.audienceInsights || formData.targetAudience,
          marketingObjective: formData.marketingObjective || 'Brand Awareness',
          platform: activePlan.platform || formData.platform || 'Instagram',
          campaignTone: activePlan.campaignTone || formData.campaignTone || 'Creative',
          budget: formData.budget || 'Lean / Organic',
          duration: formData.duration || '4 Weeks',
        }),
      });

      const data = await response.json();
      if (!response.ok || data.isFallback) {
        throw new Error(data.message || 'Regeneration notice');
      }

      setActivePlan(data);
      saveCampaignToStorage(data);
    } catch {
      setActivePlan({
        ...SAMPLE_CAMPAIGN,
        id: `plan-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <CampaignContext.Provider
      value={{
        formData,
        setFormData,
        activePlan,
        setActivePlan,
        savedCampaigns,
        isLoading,
        isRegenerating,
        errorMessage,
        setErrorMessage,
        hasApiKey,
        generateCampaign,
        regenerateCampaign,
        loadSample,
        updatePlan,
        fillSampleDemo,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
