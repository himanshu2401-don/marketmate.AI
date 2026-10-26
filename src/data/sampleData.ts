import { CampaignPlan, MicroTool } from '../types';

export const BISKIFY_SAMPLE: CampaignPlan = {
  id: 'sample-biskify-01',
  createdAt: new Date().toISOString(),
  isSample: true,
  businessName: 'Biskify Artisanal Cookies',
  industry: 'Specialty Food & DTC Confectionery',
  platform: 'Instagram',
  campaignTone: 'Creative & Friendly',
  overview:
    'A 4-week launch campaign targeted at busy remote professionals and conscious snackers. The strategy positions Biskify as the essential mindful afternoon pause, contrasting slow-baked European butter goodness against artificial supermarket vending-machine options.',
  audienceInsights:
    'Urban professionals and remote workers aged 23–40 who experience 3 PM screen fatigue and sugar crashes. They seek mindful indulgence, appreciate clean-label ingredients (grass-fed butter, demerara sugar), and share aesthetic coffee/tea pairing rituals on Instagram and Pinterest.',
  usp:
    'Micro-batch cookies slow-baked with 100% grass-fed churned butter, single-origin dark chocolate chips, and unrefined sugar — zero palm oil, zero artificial stabilizers.',
  themeAndSlogan: {
    theme: 'Pause For The Real Crunch',
    slogan: 'Real Butter. Real Pause. Biskify.',
  },
  contentIdeas: [
    'ASMR slow-motion macro reel showing golden butter folding and hot tray crackle straight from the oven.',
    '"Desk Stash Audit" carousel contrasting Biskify ingredients against ultra-processed commercial cookies.',
    'Ritual Pairing Guide: Matching dark chocolate sea salt crisps with pour-over coffee and matcha lattes.',
    'Customer unboxing montage highlighting the sustainable compostable kraft box and fresh aroma seal.',
  ],
  captions: [
    {
      hook: 'Your 3:00 PM screen fatigue deserves better than stale vending-machine snacks.',
      body: 'Meet Biskify Sea Salt Dark Chocolate. Slow-baked in small batches using pure grass-fed butter, single-origin 70% dark cocoa nibs, and coarse Maldon flakes. No artificial emulsifiers, no mystery gums — just the honest crunch your afternoon ritual has been missing.',
      callToAction: 'Tap the link in bio to build your first Work-Desk Tasting Box with free priority shipping.',
    },
    {
      hook: 'Listen to that crisp snap. That is what 100% real churned butter sounds like.',
      body: 'It took our pastry team 46 recipe variations to dial in the golden crunch-to-melt ratio. We refuse shortcuts, hydrogenated oils, or artificial vanilla. Every batch is baked fresh on Tuesday mornings and delivered directly to your front porch.',
      callToAction: 'Order before midnight Thursday to catch this weekend’s fresh bake batch.',
    },
    {
      hook: 'Coffee without a crisp artisanal cookie is just a meeting that could have been an email.',
      body: 'Elevate your daily pour-over with our Cinnamon Pecan Reserve. Handcrafted with unrefined demerara crystals that caramelize into micro-pockets of warmth with every single bite.',
      callToAction: 'Use code COFFEECRUNCH for 15% off your first subscription delivery.',
    },
  ],
  hashtags: [
    '#BiskifyBreak',
    '#ArtisanalCookies',
    '#MindfulSnacking',
    '#CleanLabelBakes',
    '#SpecialtyCoffeePairing',
    '#RemoteWorkRituals',
    '#SmallBatchBaking',
  ],
  contentCalendar: [
    {
      day: 'Week 1 · Monday',
      contentFocus: 'Founder origin story: Why we ditched palm oil for grass-fed churned butter',
      format: 'High-contrast Reel & Behind-the-Scenes Story',
    },
    {
      day: 'Week 1 · Wednesday',
      contentFocus: 'Coffee pairing infographic: Dark Chocolate Sea Salt vs. Oat Milk Flat White',
      format: 'Saveable 4-slide Educational Carousel',
    },
    {
      day: 'Week 1 · Friday',
      contentFocus: 'Customer celebration: Reposting weekend office break snapshots & tasting reviews',
      format: 'Community Story Highlight + Feed Drop',
    },
    {
      day: 'Week 2 · Tuesday',
      contentFocus: 'Ingredient transparency audit: Breaking down the 6 kitchen ingredients in our jar',
      format: 'Macro photography carousel with text overlays',
    },
    {
      day: 'Week 2 · Thursday',
      contentFocus: 'Limited-edition seasonal drop announcement: Cinnamon Toasted Pecan batch',
      format: 'Countdown Sticker Story + Short Reel',
    },
  ],
  channelRecommendations: [
    'Instagram: Primary visual showcase focusing on aesthetic video reels, micro-creator seeding, and coffee influencer pairings.',
    'LinkedIn: Founder-led organic posts sharing transparent startup lessons on ethical ingredient sourcing and supply chain choices.',
    'DTC Shopify Store: High-speed landing page with one-click bundle selectors and customized 15% first-box subscription options.',
  ],
  budgetAllocation: [
    '45% — Meta Retargeting & Lookalike Video Ads (Focusing on morning coffee & remote-work interests)',
    '30% — Micro-Influencer Gifting & Content Creator Whitelisting (15 local culinary and lifestyle creators)',
    '15% — Klaviyo Automated Email Marketing (Welcome series, abandoned cart recovery, replenishment reminder)',
    '10% — Studio Packaging Photography & Food Stylist Creative Production',
  ],
  kpis: [
    'DTC Store Checkout Conversion Rate: Target ≥ 3.5%',
    'Customer Acquisition Cost (CAC): Target ≤ $12.50 per customer',
    'Instagram Reel Engagement Rate: Target ≥ 4.8% on organic reels',
    '30-Day Re-Order Subscription Retention: Target ≥ 24%',
  ],
  nextSteps: [
    'Film 4 high-framerate baking process reels highlighting the grass-fed butter folding and sea salt dusting.',
    'Configure the 3-email abandoned-cart Klaviyo recovery flow with a 10% welcome coupon code.',
    'Ship 25 complimentary "Work-From-Home Snacking Survival Kits" to curated remote-work community leaders.',
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
