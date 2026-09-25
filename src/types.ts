export type RFMSegmentType = 'VIP' | 'Active' | 'At-Risk' | 'Sleeping' | 'Newbie';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  recencyDays: number;
  frequencyOrders: number;
  monetarySpend: number;
  rfmSegment: RFMSegmentType;
  lastCategory: string;
  churnProbability: number;
}

export interface RFMSegmentSummary {
  segment: RFMSegmentType;
  count: number;
  avgRecency: number;
  avgFrequency: number;
  avgMonetary: number;
  targetGoal: string;
  recommendedAction: string;
}

export interface FunnelEmailStep {
  id: string;
  stepNumber: number;
  delayHours: number;
  subject: string;
  preheader: string;
  dynamicOffer: string;
  bodySnippet: string;
  channel: 'Email' | 'SMS' | 'Push';
}

export interface AdCreativeVariant {
  id: string;
  segmentTarget: RFMSegmentType;
  platform: 'Meta Ads' | 'Google PMax' | 'TikTok Ads';
  headline: string;
  primaryText: string;
  ctaText: string;
  visualConcept: string;
  targetROAS: number;
}

export interface OverallKPIs {
  roasCurrent: number;
  roasTarget: number;
  cacCurrent: number;
  cacTarget: number;
  emailRepeatRateCurrent: number;
  emailRepeatRateTarget: number;
  aovCurrent: number;
  aovTarget: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
