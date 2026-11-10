import { CampaignPlan, MicroTool } from '../types';

export const SAMPLE_CAMPAIGN: CampaignPlan = {
  id: 'sample-aurahealth-01',
  createdAt: new Date().toISOString(),
  isSample: true,
  businessName: 'AuraHealth Smart Ring',
  industry: 'Health Tech & Wearable Wellness DTC',
  platform: 'Instagram',
  campaignTone: 'Inspiring & Technical',
  overview:
    'A 4-week multi-channel launch campaign targeting busy professionals, athletes, and biohackers. The strategy positions AuraHealth as the minimalist, screen-free wearable alternative that delivers continuous circadian insights without notification anxiety or recurring subscription fees.',
  audienceInsights:
    'High-performing professionals, endurance athletes, and wellness enthusiasts aged 24–45 looking to optimize sleep cycles, heart-rate variability (HRV), and recovery metrics without wearing a bulky screen-heavy smartwatch to bed.',
  usp:
    'Aerospace-grade titanium smart ring with medical-grade biometrics, 7-day battery life on a single wireless charge, and zero subscription fees — ever.',
  themeAndSlogan: {
    theme: 'Quiet Intelligence for Peak Recovery',
    slogan: 'Track Less. Recover Better. AuraHealth.',
  },
  contentIdeas: [
    'Macro 4K teardown reel showcasing the inner titanium core and hypoallergenic biometric sensors.',
    '"Smartwatch vs. Smart Ring" carousel contrasting screen distractions and sleep ergonomics.',
    'Circadian Optimization Guide: Decoding your nocturnal HRV, deep sleep latency, and morning readiness.',
    'Unboxing and sizing kit interactive walkthrough highlighting the precision fit guarantee.',
  ],
  captions: [
    {
      hook: 'Your smartwatch wakes you up with vibrating emails. This ring wakes you up with circadian recovery data.',
      body: 'Meet the AuraHealth Gen-3 Smart Ring. Forged from aerospace titanium and weighing just 3.2 grams, it monitors your nocturnal HRV, core temperature shifts, and deep sleep stages with laboratory precision — with zero subscription fees, ever.',
      callToAction: 'Tap the link in bio to claim early-access launch pricing + a complimentary titanium sizing kit.',
    },
    {
      hook: 'What if peak performance did not require another glowing screen on your wrist?',
      body: 'We spent 24 months engineering microscopic optical pulse sensors directly into a featherweight titanium band. Waterproof to 50 meters with a true 7-day battery life on a single wireless charge.',
      callToAction: 'Pre-order this week for free express shipping and guaranteed launch week dispatch.',
    },
    {
      hook: 'The best wearable is the one you forget you are wearing until you review your morning recovery score.',
      body: 'Designed for seamless sleep tracking without the bulk, blue light, or battery anxiety of traditional smartwatches. Wake up to personalized readiness recommendations synced automatically to Apple Health and Google Fit.',
      callToAction: 'Use code RECOVER20 for $30 off your sizing kit and reservation today.',
    },
  ],
  hashtags: [
    '#AuraHealth',
    '#SmartRing',
    '#SleepOptimization',
    '#Biohacking',
    '#RecoveryWearable',
    '#CircadianRhythm',
    '#HealthTech',
  ],
  contentCalendar: [
    {
      day: 'Week 1 · Monday',
      contentFocus: 'Founder origin story: Why we chose aerospace titanium over bulky smartwatch screens',
      format: 'High-contrast 4K Reel & Behind-the-Scenes Story',
    },
    {
      day: 'Week 1 · Wednesday',
      contentFocus: 'Sleep science infographic: Nocturnal HRV vs. Deep Sleep readiness breakdown',
      format: 'Saveable 4-slide Educational Carousel',
    },
    {
      day: 'Week 1 · Friday',
      contentFocus: 'Real-world endurance test: 7 days, 1 charger, zero recharges needed',
      format: 'Community Story Highlight + Feed Drop',
    },
    {
      day: 'Week 2 · Tuesday',
      contentFocus: 'Sensor accuracy breakdown: Lab comparison vs. medical-grade pulse oximeters',
      format: 'Macro photography carousel with data overlays',
    },
    {
      day: 'Week 2 · Thursday',
      contentFocus: 'Limited launch batch announcement: Gunmetal & Stealth Matte finish availability',
      format: 'Countdown Sticker Story + Short Reel',
    },
  ],
  channelRecommendations: [
    'Instagram: High-contrast product reveals, macro sensor photography, and creator recovery unboxings.',
    'YouTube & Tech Reviews: In-depth sleep accuracy benchmarks, battery life teardowns, and comparison reviews.',
    'DTC Storefront: High-converting interactive sizing kit portal and bundle configurator with 30-day trial guarantee.',
  ],
  budgetAllocation: [
    '40% — Meta & YouTube High-Intent Video Retargeting (Biohackers, fitness trackers, sleep tech)',
    '25% — Creator Seeding & Influencer Reviews (Sleep specialists, marathoners, tech reviewers)',
    '20% — Studio 3D Industrial Renders & Macro Video Production',
    '15% — Retention Email Flows & Pre-order Sizing Kit Fulfillment',
  ],
  kpis: [
    'DTC Store Checkout Conversion Rate: Target ≥ 3.8%',
    'Customer Acquisition Cost (CAC): Target ≤ $24.00 per hardware order',
    'Video Completion Rate: Target ≥ 38% on 30-second sensor demo reels',
    'Sizing Kit-to-Final Ring Conversion: Target ≥ 82% within 14 days',
  ],
  nextSteps: [
    'Produce 3 high-contrast macro renders highlighting the titanium bezel and sensor nodes.',
    'Finalize the automated 3-part sizing kit email onboarding guide and fit confirmation portal.',
    'Ship 30 pre-production units to certified sleep medicine researchers and endurance athletes.',
  ],
};

export const MICRO_TOOLS: MicroTool[] = [
  {
    id: 'strategy',
    title: 'Campaign Strategy Generator',
    desc: 'High-level multi-channel marketing architecture and funnel blueprints tailored to your goal.',
    icon: 'Target',
    promptTemplate: 'Generate a high-level 3-stage marketing funnel (Top-of-Funnel awareness, Middle-of-Funnel consideration, Bottom-of-Funnel conversion) with clear tactical milestones for:',
    placeholder: 'e.g. A direct-to-consumer eco-friendly sneaker brand launching in spring...',
  },
  {
    id: 'caption',
    title: 'Social Media Caption Writer',
    desc: 'Punchy, scroll-stopping social captions complete with high-converting hooks and strong CTAs.',
    icon: 'MessageSquare',
    promptTemplate: 'Write 3 distinct, high-converting social media captions (Hook, Story Body, Call-to-Action) for:',
    placeholder: 'e.g. Announcing our new ergonomic standing desk converter with 20% launch discount...',
  },
  {
    id: 'adcopy',
    title: 'Ad Copy Generator',
    desc: 'Platform-optimized advertising copy for Meta, Google Search, and LinkedIn sponsored campaigns.',
    icon: 'Zap',
    promptTemplate: 'Generate 3 high-converting ad copy sets (Headline, Primary Text, Subtext, Call-to-Action button) for paid ads promoting:',
    placeholder: 'e.g. B2B bookkeeping software helping freelance creative designers save 5 hours weekly...',
  },
  {
    id: 'calendar',
    title: 'Content Calendar Planner',
    desc: 'Structured weekly and monthly posting cadences with theme pillars and asset format recommendations.',
    icon: 'Calendar',
    promptTemplate: 'Create a strategic 7-day content posting calendar with content theme, post type, and objective for:',
    placeholder: 'e.g. A boutique yoga studio running a 30-day spring wellness challenge...',
  },
  {
    id: 'slogan',
    title: 'Brand Slogan Creator',
    desc: 'Memorable brand taglines, emotional mantras, and sticky identity slogans.',
    icon: 'Sparkles',
    promptTemplate: 'Generate 6 memorable, rhythmic, punchy brand slogans and taglines for:',
    placeholder: 'e.g. An AI-powered personal chef app that suggests recipes based on your fridge contents...',
  },
  {
    id: 'hashtag',
    title: 'Hashtag Suggestion Tool',
    desc: 'Targeted discovery tags categorized by niche community, high-volume reach, and branded tags.',
    icon: 'Hash',
    promptTemplate: 'Provide 15 organized hashtags divided into Niche/Community (under 100k posts), High-Intent, and Brand Signature for:',
    placeholder: 'e.g. Handcrafted ceramic mugs and pottery studio in Seattle...',
  },
  {
    id: 'persona',
    title: 'Audience Persona Builder',
    desc: 'Deep customer profile covering demographics, core motivations, pain points, and buying triggers.',
    icon: 'Users',
    promptTemplate: 'Build a detailed ideal customer buyer persona profile (Name, Demographics, Daily Frustrations, Desired Transformation, Objections to Buying) for:',
    placeholder: 'e.g. A digital nomad co-living space subscription in Portugal...',
  },
  {
    id: 'email',
    title: 'Email Marketing Writer',
    desc: 'High-open-rate subject lines, launch broadcast copy, and automated onboarding sequences.',
    icon: 'Mail',
    promptTemplate: 'Write an engaging promotional email newsletter including 3 subject line options, preview text, persuasive body, and CTA button for:',
    placeholder: 'e.g. Early-bird ticket sales for our upcoming Indie Creator Summit...',
  },
  {
    id: 'product_desc',
    title: 'Product Description Generator',
    desc: 'E-commerce copy focusing on benefits over features with emotional resonance and clarity.',
    icon: 'FileText',
    promptTemplate: 'Write a persuasive e-commerce product description featuring an evocative opening, 4 bulleted key benefits, specifications, and a buy CTA for:',
    placeholder: 'e.g. A travel backpack made from recycled ocean plastics with waterproof laptop sleeve...',
  },
  {
    id: 'kpi_insights',
    title: 'Marketing Performance Insights',
    desc: 'Realistic KPI benchmarks, testing frameworks, and measurement checklists for campaigns.',
    icon: 'BarChart3',
    promptTemplate: 'Provide a realistic KPI measurement scorecard with target metric benchmarks, tracking methods, and optimization advice for:',
    placeholder: 'e.g. A SaaS tool launching a freemium sign-up campaign on LinkedIn and product hunt...',
  },
];
