export type NewsCategory = 'ai' | 'tech' | 'finance' | 'breaking' | 'all';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: NewsCategory;
  author: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
  url: string;
  isBreaking?: boolean;
}

export interface NewsState {
  items: NewsItem[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  selectedCategory: NewsCategory;
}

export interface NewsFilter {
  category?: NewsCategory;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
