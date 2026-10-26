export interface CampaignFormState {
  businessName: string;
  productDescription: string;
  industry: string;
  targetAudience: string;
  marketingObjective: string;
  platform: 'Instagram' | 'LinkedIn' | 'Facebook' | 'YouTube' | 'Website';
  campaignTone: 'Professional' | 'Creative' | 'Friendly' | 'Premium' | 'Playful';
  budget?: string;
  duration?: string;
}

export interface SocialCaption {
  hook: string;
  body: string;
  callToAction: string;
}

export interface ContentCalendarItem {
  day: string;
  contentFocus: string;
  format: string;
}

export interface CampaignPlan {
  id: string;
  createdAt: string;
  isSample?: boolean;
  businessName: string;
  industry?: string;
  platform?: string;
  campaignTone?: string;
  overview: string;
  audienceInsights: string;
  usp: string;
  themeAndSlogan: {
    theme: string;
    slogan: string;
  };
  contentIdeas: string[];
  captions: SocialCaption[];
  hashtags: string[];
  contentCalendar: ContentCalendarItem[];
  channelRecommendations: string[];
  budgetAllocation: string[];
  kpis: string[];
  nextSteps: string[];
}

export interface MicroTool {
  id: string;
  title: string;
  desc: string;
  icon: string;
  promptTemplate: string;
  placeholder: string;
}
