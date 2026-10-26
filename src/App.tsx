/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CampaignEngine } from './components/CampaignEngine';
import { ResultsDashboard } from './components/ResultsDashboard';
import { AIToolsGrid } from './components/AIToolsGrid';
import { HowItWorks } from './components/HowItWorks';
import { WhyMarketMate } from './components/WhyMarketMate';
import { SampleShowcase } from './components/SampleShowcase';
import { AboutAndContact } from './components/AboutAndContact';
import { Footer } from './components/Footer';
import { CampaignFormState, CampaignPlan } from './types';
import { BISKIFY_SAMPLE } from './data/sampleData';

export default function App() {
  const [formData, setFormData] = useState<CampaignFormState>({
    businessName: '',
    productDescription: '',
    industry: '',
    targetAudience: '',
    marketingObjective: 'Brand Awareness & Discovery',
    platform: 'Instagram',
    campaignTone: 'Creative',
    budget: '',
    duration: '',
  });

  const [activePlan, setActivePlan] = useState<CampaignPlan | null>(null);
  const [savedCampaigns, setSavedCampaigns] = useState<CampaignPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  const dashboardRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<HTMLDivElement>(null);

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
        // Fallback for development if server takes a moment
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
        }
      }
    } catch {
      // Storage access restrictions
    }
  }, []);

  const saveCampaignToStorage = (plan: CampaignPlan) => {
    try {
      const existing = savedCampaigns.filter((p) => p.id !== plan.id);
      const updated = [plan, ...existing].slice(0, 10);
      setSavedCampaigns(updated);
      localStorage.setItem('marketmate_saved_campaigns', JSON.stringify(updated));
    } catch {
      // Local storage quota or privacy guard
    }
  };

  const handleLaunchClick = () => {
    const el = document.getElementById('engine-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('features');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLoadSample = () => {
    setActivePlan(BISKIFY_SAMPLE);
    setFormData({
      businessName: BISKIFY_SAMPLE.businessName,
      productDescription:
        'Micro-batch cookies slow-baked with 100% grass-fed churned butter, single-origin 70% dark chocolate chunks, and unrefined demerara crystals.',
      industry: BISKIFY_SAMPLE.industry || 'Specialty Food & DTC Confectionery',
      targetAudience: BISKIFY_SAMPLE.audienceInsights,
      marketingObjective: 'Brand Awareness & Discovery',
      platform: 'Instagram',
      campaignTone: 'Creative',
      budget: '$1,500 total ($375/week)',
      duration: '4 Weeks',
    });
    setErrorMessage(null);
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleGenerateCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.businessName.trim()) {
      setErrorMessage('Please enter your business or brand name.');
      return;
    }
    if (!formData.productDescription.trim()) {
      setErrorMessage('Please provide a brief product or service description.');
      return;
    }
    if (!formData.targetAudience.trim()) {
      setErrorMessage('Please define your target audience.');
      return;
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
            'Notice: Live API generation requires billing or an active API key. Loaded the complete interactive Biskify sample demonstration so you can explore all 12 cards, live editing, and exports.'
        );
        setActivePlan(BISKIFY_SAMPLE);
        setTimeout(() => {
          dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return;
      }

      setActivePlan(data);
      saveCampaignToStorage(data);
      setTimeout(() => {
        dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'An unexpected error occurred during generation. Please check inputs and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
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
      if (!response.ok) {
        throw new Error(data.message || 'Regeneration failed.');
      }

      setActivePlan(data);
      saveCampaignToStorage(data);
    } catch {
      // In demo mode or if API is not set, re-fresh with sample
      setActivePlan({
        ...BISKIFY_SAMPLE,
        id: `plan-${Date.now()}`,
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleUpdatePlan = (updated: CampaignPlan) => {
    setActivePlan(updated);
    saveCampaignToStorage(updated);
  };

  return (
    <div className="min-h-screen bg-[#F8F6FF] text-[#21113D] font-sans antialiased selection:bg-[#7138D8] selection:text-white flex flex-col justify-between">
      {/* 1. Header / Navbar */}
      <Navbar
        onLaunchClick={handleLaunchClick}
        savedCampaigns={savedCampaigns}
        onSelectCampaign={(plan) => {
          setActivePlan(plan);
          setTimeout(() => dashboardRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }}
        activePlanId={activePlan?.id}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onCreateClick={handleLaunchClick}
          onExploreClick={handleExploreClick}
          onSamplePreviewClick={handleLoadSample}
        />

        {/* 3. AI Marketing Engine Form */}
        <div ref={engineRef}>
          <CampaignEngine
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleGenerateCampaign}
            isLoading={isLoading}
            errorMessage={errorMessage}
            onLoadSample={handleLoadSample}
            hasApiKey={hasApiKey}
          />
        </div>

        {/* 4. AI Results Dashboard (Displayed when a plan exists) */}
        <div ref={dashboardRef}>
          {activePlan && (
            <ResultsDashboard
              plan={activePlan}
              onUpdatePlan={handleUpdatePlan}
              onRegenerate={handleRegenerate}
              isRegenerating={isRegenerating}
            />
          )}
        </div>

        {/* 5. AI Tools Section (10 interactive micro-tools) */}
        <AIToolsGrid
          currentBriefText={
            formData.productDescription
              ? `${formData.businessName}: ${formData.productDescription}`
              : activePlan?.overview
          }
          hasApiKey={hasApiKey}
        />

        {/* 6. How It Works */}
        <HowItWorks />

        {/* 7. Why MarketMate.AI */}
        <WhyMarketMate />

        {/* 8. Sample Campaign Showcase (Biskify) */}
        <SampleShowcase onLoadSample={handleLoadSample} />

        {/* 9. About and Contact Form */}
        <AboutAndContact />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
