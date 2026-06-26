export type MarketRegion = 'international' | 'taiwan';

export type SourceSite =
  | 'Penguin Magic'
  | 'TCC Magic'
  | 'Vanishing Inc'
  | '52magic'
  | 'Other';

export type MagicCategory =
  | 'Card'
  | 'Coin'
  | 'Mentalism'
  | 'iPhone'
  | 'Stage'
  | 'Close-up'
  | 'Street'
  | 'Other';

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  creator: string;
  source: SourceSite;
  category: MagicCategory;
  region: MarketRegion;
  description: string;
  imageUrl: string;
  price: number;
  currency: string;
  releaseDate: string;
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface Trend {
  id: string;
  category: MagicCategory;
  region: MarketRegion;
  focusCount: number;
  description: string;
  topProducts: string[];
}

export interface ProductFilters {
  region: MarketRegion | 'all';
  source: SourceSite | 'all';
  category: MagicCategory | 'all';
  search: string;
}
