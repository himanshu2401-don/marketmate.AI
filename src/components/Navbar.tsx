import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Rocket, Menu, X, History, ChevronDown, Check } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const navigate = useNavigate();

  const { savedCampaigns, activePlan, setActivePlan } = useCampaign();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Campaign Planner', path: '/campaign-planner' },
    { name: 'Social Content', path: '/social-content' },
    { name: 'Growth Strategy', path: '/growth-strategy' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#21113D]/95 backdrop-blur-md border-b border-[#7138D8]/20 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-black/70 border border-[#7138D8]/50 flex items-center justify-center p-1 shadow-lg shadow-[#7138D8]/30 group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/assets/aistudio/Purple_Grunge_Respawn_Lab_Logo_9f1cceeb.png"
              alt="MarketMate.AI Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="leading-tight">
            <span className="text-xl font-bold tracking-tight text-white block">
              MarketMate<span className="text-[#B8A0FF]">.AI</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#B8A0FF]/80 font-semibold block">
              Marketing Engine
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-purple-100">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors whitespace-nowrap py-1 border-b-2 ${
                  isActive
                    ? 'text-white border-[#B8A0FF] font-semibold'
                    : 'text-purple-200/80 hover:text-white border-transparent'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions Zone */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {savedCampaigns.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setHistoryOpen(!historyOpen)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-purple-100 flex items-center gap-2 transition cursor-pointer"
                title="View saved campaign plans"
                aria-expanded={historyOpen}
              >
                <History className="w-3.5 h-3.5 text-[#B8A0FF]" />
                <span>History ({savedCampaigns.length})</span>
                <ChevronDown className="w-3 h-3 text-purple-300" />
              </button>

              {historyOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#21113D] border border-[#7138D8]/50 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl">
                  <div className="text-[11px] font-semibold text-purple-300 px-3 py-1.5 uppercase tracking-wider border-b border-white/10">
                    Saved Campaigns
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                    {savedCampaigns.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => {
                          setActivePlan(plan);
                          setHistoryOpen(false);
                          navigate('/campaign-planner');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs transition flex flex-col cursor-pointer ${
                          activePlan?.id === plan.id
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

          <Link
            to="/campaign-planner"
            className="bg-[#7138D8] hover:bg-[#5f2bc0] active:scale-95 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-[#7138D8]/30 hover:shadow-lg hover:shadow-[#7138D8]/50 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Rocket className="w-4 h-4" />
            <span>Launch Engine</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            to="/campaign-planner"
            className="sm:hidden bg-[#7138D8] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <Rocket className="w-3.5 h-3.5" /> Launch
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-purple-200 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#21113D] border-b border-[#7138D8]/30 px-6 py-5 space-y-3">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-[#B8A0FF] font-bold pl-2 border-l-2 border-[#B8A0FF]' : 'text-purple-100 hover:text-white'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-white/10 space-y-2">
            <Link
              to="/campaign-planner"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#7138D8] text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 text-sm shadow-md"
            >
              <Rocket className="w-4 h-4" /> Launch Marketing Engine
            </Link>

            {savedCampaigns.length > 0 && (
              <div className="pt-2 text-xs text-purple-300">
                <span className="font-semibold block mb-1">Quick Load Saved Campaign:</span>
                <div className="flex flex-wrap gap-1.5">
                  {savedCampaigns.slice(0, 3).map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => {
                        setActivePlan(plan);
                        setMobileMenuOpen(false);
                        navigate('/campaign-planner');
                      }}
                      className="bg-white/10 px-2.5 py-1 rounded-md text-[11px] text-white hover:bg-white/20 truncate max-w-[140px]"
                    >
                      {plan.businessName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
