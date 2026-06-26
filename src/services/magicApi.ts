import { Product, Review, Trend, ProductFilters } from '../types';
import { mockProducts } from '../mocks/products';
import { mockReviews } from '../mocks/reviews';
import { mockTrends } from '../mocks/trends';

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getProducts(filters?: Partial<ProductFilters>): Promise<Product[]> {
  await delay();
  // TODO: replace with apiClient.get<Product[]>(`/api/products?${new URLSearchParams(filters)}`)
  let results = [...mockProducts];
  if (filters?.region && filters.region !== 'all')
    results = results.filter((p) => p.region === filters.region);
  if (filters?.source && filters.source !== 'all')
    results = results.filter((p) => p.source === filters.source);
  if (filters?.category && filters.category !== 'all')
    results = results.filter((p) => p.category === filters.category);
  if (filters?.search)
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
        p.creator.toLowerCase().includes(filters.search!.toLowerCase())
    );
  return results;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay();
  // TODO: replace with apiClient.get<Product>(`/api/products/${id}`)
  return mockProducts.find((p) => p.id === id);
}

export async function getReviews(productId: string): Promise<Review[]> {
  await delay(300);
  // TODO: replace with apiClient.get<Review[]>(`/api/products/${productId}/reviews`)
  return mockReviews.filter((r) => r.productId === productId);
}

export async function getTrending(region?: 'international' | 'taiwan' | 'all'): Promise<Trend[]> {
  await delay(350);
  // TODO: replace with apiClient.get<Trend[]>(`/api/trends?region=${region}`)
  if (!region || region === 'all') return mockTrends;
  return mockTrends.filter((t) => t.region === region);
}
