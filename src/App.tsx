/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CampaignProvider } from './context/CampaignContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CampaignPlannerPage } from './pages/CampaignPlannerPage';
import { SocialContentPage } from './pages/SocialContentPage';
import { GrowthStrategyPage } from './pages/GrowthStrategyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <CampaignProvider>
        <div className="min-h-screen bg-[#F8F6FF] text-[#21113D] font-sans antialiased selection:bg-[#7138D8] selection:text-white flex flex-col justify-between">
          {/* Shared Sticky Responsive Navigation */}
          <Navbar />

          {/* Dedicated Page Content Routing */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/campaign-planner" element={<CampaignPlannerPage />} />
              <Route path="/social-content" element={<SocialContentPage />} />
              <Route path="/growth-strategy" element={<GrowthStrategyPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Shared Global Footer */}
          <Footer />
        </div>
      </CampaignProvider>
    </BrowserRouter>
  );
}
