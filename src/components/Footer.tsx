import React, { useState } from 'react';
import { Sparkles, Shield, FileText, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#21113D] text-purple-200 text-xs py-14 border-t border-[#7138D8]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7138D8] to-[#B8A0FF] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                MarketMate<span className="text-[#B8A0FF]">.AI</span>
              </span>
            </div>
            <p className="text-xs text-purple-300 font-medium">
              “Your Ideas. Our Intelligence. Smarter Marketing.”
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-purple-200 text-sm font-medium">
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#tools" className="hover:text-white transition-colors">
              AI Tools
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-white transition-colors cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-white transition-colors cursor-pointer text-left"
            >
              Terms of Use
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-purple-300/80 text-xs">
          <p>© {new Date().getFullYear()} MarketMate.AI — Marketing Engine. All rights reserved.</p>
          <p>Built for entrepreneurs, founders, students, creators, and small business owners.</p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {modalType === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-[#21113D]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-[#21113D] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#7138D8] mb-2 font-bold text-xs uppercase tracking-wider">
              <Shield className="w-4 h-4" /> Privacy Policy
            </div>
            <h3 className="text-xl font-bold mb-3">Your Privacy at MarketMate.AI</h3>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                MarketMate.AI prioritizes data minimalism and user confidentiality. Business briefs, target market descriptions, and campaign inputs entered into the Marketing Engine are transmitted via secure HTTPS to server-side AI endpoints solely to synthesize campaign strategies.
              </p>
              <p>
                We do not sell, rent, or trade your proprietary business ideas or marketing plans. Saved campaigns are stored locally within your browser's persistent storage session.
              </p>
              <p>
                API requests to the underlying language models follow strict ephemeral processing boundaries in accordance with Google AI platform standards.
              </p>
            </div>
            <button
              onClick={() => setModalType(null)}
              className="mt-6 w-full py-2.5 bg-[#7138D8] text-white rounded-xl font-semibold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms of Use Modal */}
      {modalType === 'terms' && (
        <div className="fixed inset-0 z-50 bg-[#21113D]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-[#21113D] shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#7138D8] mb-2 font-bold text-xs uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Terms of Use
            </div>
            <h3 className="text-xl font-bold mb-3">Terms of Service</h3>
            <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
              <p>
                MarketMate.AI provides marketing planning assistance, copywriting frameworks, and strategic blueprints for informational and planning purposes.
              </p>
              <p>
                While our models generate grounded, platform-specific recommendations, marketing outcomes depend on market conditions, product execution, and external consumer dynamics. MarketMate.AI makes no guarantees of specific revenue or sales volumes.
              </p>
              <p>
                Users maintain full ownership and creative license over all marketing copy, slogans, and campaign assets generated using the engine.
              </p>
            </div>
            <button
              onClick={() => setModalType(null)}
              className="mt-6 w-full py-2.5 bg-[#7138D8] text-white rounded-xl font-semibold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
