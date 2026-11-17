export type LogoEmblemId = 'prism' | 'pillar' | 'orbit' | 'nexus' | 'crest' | 'monogram';

export type LogoFrameShape = 'squircle' | 'circle' | 'outline' | 'minimal';

export interface ThemePalette {
  id: string;
  name: string;
  primary: string;     // Deep corporate navy/slate (e.g. #0F172A)
  secondary: string;   // Secondary corporate blue/indigo (e.g. #1E3A8A)
  accent: string;      // Action button accent (e.g. #2563EB or #D97706)
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface AdvantageItem {
  title: string;
  description: string;
  icon: 'shield' | 'clock' | 'layers';
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  outcome: string;
  icon: 'code' | 'building' | 'trending' | 'truck' | 'briefcase' | 'cpu';
  basePriceMillions: number;
  unitLabel: string;
  minScale: number;
  maxScale: number;
  scaleUnit: string;
  featured?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'Teknologi & Sistem' | 'Infrastruktur & Merek';
  year: string;
  duration: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  outcome: string;
  rating: number;
}

export interface CompanyConfig {
  companyName: string;
  industry: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  whatsappNumber: string;
  email: string;
  address: string;
  operationalHours: string;
  aboutStory: string;
  vision: string;
  mission: string[];
  logoEmblem: LogoEmblemId;
  logoFrame: LogoFrameShape;
  customLogoUrl: string | null;
  palette: ThemePalette;
  stats: StatItem[];
  advantages: AdvantageItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  testimonials: TestimonialItem[];
}
