import React from 'react';
import { PenTool, Target, Cpu, SendHorizontal, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Describe Your Business',
      desc: 'Enter your brand name, core product or service, target customer demographics, and niche identity.',
      icon: PenTool,
    },
    {
      step: '02',
      title: 'Choose Your Marketing Goal',
      desc: 'Select preferred channels (Instagram, LinkedIn, YouTube, Web), desired tone, and optional budget ranges.',
      icon: Target,
    },
    {
      step: '03',
      title: 'Generate AI Campaign',
      desc: 'Our engine synthesizes your parameters into a 12-pillar tactical strategy with captions, hashtags, and calendars.',
      icon: Cpu,
    },
    {
      step: '04',
      title: 'Refine, Copy & Launch',
      desc: 'Edit any card directly in-app, copy hooks to your scheduling queue, or export a formatted Markdown roadmap.',
      icon: SendHorizontal,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-y border-purple-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
            <span>Process Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#21113D]">
            How MarketMate.AI Works
          </h2>
          <p className="mt-3 text-base text-gray-600 leading-relaxed">
            Four streamlined steps from a rough concept to a structured, executable multi-channel campaign plan.
          </p>
        </div>

        {/* Horizontal Process Grid on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#F8F6FF] rounded-2xl p-6 border border-purple-100/80 flex flex-col justify-between hover:border-[#7138D8]/40 hover:shadow-md transition duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-[#7138D8]/30 font-mono tracking-tighter">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#7138D8]/10 text-[#7138D8] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#21113D] text-lg mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-purple-100/60 flex items-center text-[11px] font-semibold text-[#7138D8]">
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
