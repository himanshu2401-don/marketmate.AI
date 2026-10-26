import React, { useState } from 'react';
import { Sparkles, Rocket, Menu, X, History, ChevronDown } from 'lucide-react';
import { CampaignPlan } from '../types';

interface NavbarProps {
  onLaunchClick: () => void;
  savedCampaigns: CampaignPlan[];
  onSelectCampaign: (plan: CampaignPlan) => void;
  activePlanId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLaunchClick,
  savedCampaigns,
  onSelectCampaign,
  activePlanId,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#21113D]/95 backdrop-blur-md border-b border-[#7138D8]/20 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <a href="#home" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7138D8] to-[#B8A0FF] flex items-center justify-center shadow-lg shadow-[#7138D8]/40 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="text-xl font-bold tracking-tight text-white block">
              MarketMate<span className="text-[#B8A0FF]">.AI</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#B8A0FF]/80 font-semibold block">
              Marketing Engine
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-purple-100">
          <a href="#home" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            Home
          </a>
          <a href="#features" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            Features
          </a>
          <a href="#tools" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            AI Tools
          </a>
          <a href="#how-it-works" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            How It Works
          </a>
          <a href="#sample" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            Sample
          </a>
          <a href="#about" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            About
          </a>
          <a href="#contact" className="hover:text-[#B8A0FF] transition-colors whitespace-nowrap">
            Contact
          </a>
        </div>

        {/* Actions Zone */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {savedCampaigns.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-purple-100 flex items-center gap-2 transition"
                title="View saved campaign plans"
              >
                <History className="w-3.5 h-3.5 text-[#B8A0FF]" />
                <span>History ({savedCampaigns.length})</span>
                <ChevronDown className="w-3 h-3 text-purple-300" />
              </button>

              {historyOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#21113D] border border-[#7138D8]/40 rounded-2xl shadow-2xl p-2 z-50">
                  <div className="text-[11px] font-semibold text-purple-300 px-3 py-1.5 uppercase tracking-wider border-b border-white/10">
                    Saved Campaigns
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                    {savedCampaigns.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => {
                          onSelectCampaign(plan);
                          setHistoryOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex flex-col ${
                          activePlanId === plan.id
                            ? 'bg-[#7138D8] text-white font-semibold'
                            : 'text-purple-100 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate">{plan.businessName}</span>
                        <span className="text-[10px] text-purple-300/80">
                          {new Date(plan.createdAt).toLocaleDateString()} · {plan.platform || 'Multi'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onLaunchClick}
            className="bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md shadow-[#7138D8]/30 hover:shadow-lg hover:shadow-[#7138D8]/50 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Rocket className="w-4 h-4" />
            Launch Marketing Engine
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-purple-200 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#21113D] border-b border-[#7138D8]/30 px-6 py-5 space-y-3">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            Home
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            Features
          </a>
          <a
            href="#tools"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            AI Tools
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            How It Works
          </a>
          <a
            href="#sample"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            Sample Campaign
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-purple-100 hover:text-[#B8A0FF] font-medium text-sm"
          >
            Contact
          </a>

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchClick();
              }}
              className="w-full bg-[#7138D8] text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 text-sm shadow-md"
            >
              <Rocket className="w-4 h-4" /> Launch Marketing Engine
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
