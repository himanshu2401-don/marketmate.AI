import React from 'react';
import {
  Clock,
  Compass,
  Target,
  Smile,
  Edit3,
  CheckCircle,
} from 'lucide-react';

export const WhyMarketMate: React.FC = () => {
  const valueProps = [
    {
      title: 'Faster Campaign Planning',
      desc: 'Overcome blank-page hesitation. Transition from a raw brand idea to a comprehensive 4-week launch roadmap in under two minutes.',
      icon: Clock,
    },
    {
      title: 'Platform-Specific Content',
      desc: 'Captions, hooks, and content formats calibrated for the distinct formats and audiences of Instagram, LinkedIn, YouTube, and Web.',
      icon: Compass,
    },
    {
      title: 'Ideas Tailored to Business Goals',
      desc: 'Whether your objective is brand awareness, lead capture, or e-commerce sales, every asset maps directly to measurable outcomes.',
      icon: Target,
    },
    {
      title: 'Beginner-Friendly Workflow',
      desc: 'No confusing prompt engineering or AI jargon needed. Simple, intuitive fields collect exactly what the model needs to generate results.',
      icon: Smile,
    },
    {
      title: 'Editable & Reusable Outputs',
      desc: 'Full creative control. Edit any section live, export clean Markdown or JSON, and adapt campaign elements across multiple launches.',
      icon: Edit3,
    },
    {
      title: 'Clear, Actionable Recommendations',
      desc: 'Pragmatic guidance, realistic KPI benchmarks, and budget distributions designed to be implemented immediately without guesswork.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7138D8]/10 text-[#7138D8] text-xs font-semibold mb-3">
          <span>Engine Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#21113D]">
          Why Builders Choose MarketMate.AI
        </h2>
        <p className="mt-3 text-base text-gray-600 leading-relaxed">
          Engineered for entrepreneurs, startups, creators, and small business owners who require grounded, actionable strategies over hollow buzzwords.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {valueProps.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-purple-100 shadow-xs hover:shadow-lg hover:border-[#7138D8]/30 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#7138D8]/10 text-[#7138D8] flex items-center justify-center font-bold text-sm mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#21113D] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
