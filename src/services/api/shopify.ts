import { apiClient } from './client';

/**
 * Shopify product info (for future use)
 */
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  currency: string;
  imageUrl?: string;
}

/**
 * Shopify API service
 * Note: Deferred until after iOS MVP unless purchase is required for launch
 */
export const shopifyApi = {
  /**
   * Get product info
   * TODO: Implement after MVP
   */
  async getProduct(_productId: string): Promise<ShopifyProduct> {
    throw new Error('Shopify API not implemented - deferred until after MVP');
  },

  /**
   * Get products by book IDs
   * TODO: Implement after MVP
   */
  async getProductsByBookIds(_bookIds: string[]): Promise<ShopifyProduct[]> {
    throw new Error('Shopify API not implemented - deferred until after MVP');
  },
};

