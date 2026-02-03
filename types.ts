
export enum AICategory {
  TEXT = 'Texto y Escritura',
  IMAGE = 'Imagen y Diseño',
  AUDIO = 'Audio y Música',
  VIDEO = 'Video y Animación',
  CODING = 'Programación',
  RESEARCH = 'Investigación y Productividad',
  MARKETING = 'Marketing y SEO',
  PREMIUM = 'Herramientas Premium'
}

export type PricingType = 'Free' | 'Freemium' | 'Paid';

export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: AICategory;
  pricingType: PricingType;
  pricingNote: string;
  imageUrl: string;
  isFreemium?: boolean; 
}

export interface CategoryFilter {
  id: string;
  label: string;
  icon: string;
}

export interface DiscoveredTool {
  name: string;
  description: string;
  url: string;
  category: string;
  pricingNote: string;
}

export interface GroundingSource {
  title: string;
  url: string;
}

export interface DiscoveryResponse {
  tools: DiscoveredTool[];
  sources: GroundingSource[];
}
