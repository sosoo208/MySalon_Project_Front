// 상품 관련 API
import { apiClient } from '../config.js';

export const productApi = {
  // 상품 목록 조회
  getProducts: async (params = {}) => {
    try {
      const response = await apiClient.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('상품 목록 조회 실패:', error);
      throw error;
    }
  },

  // 상품 상세 조회
  getProductDetail: async (productId) => {
    try {
      const response = await apiClient.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      throw error;
    }
  },

  // 상품 검색
  searchProducts: async (searchParams) => {
    try {
      const response = await apiClient.get('/products/search', { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('상품 검색 실패:', error);
      throw error;
    }
  },

  // 상품 등록 (판매자용)
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('상품 등록 실패:', error);
      throw error;
    }
  },

  // 상품 수정 (판매자용)
  updateProduct: async (productId, productData) => {
    try {
      const response = await apiClient.put(`/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('상품 수정 실패:', error);
      throw error;
    }
  },

  // 상품 삭제 (판매자용)
  deleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('상품 삭제 실패:', error);
      throw error;
    }
  },

  // 상품별 평점/리뷰 조회
  getProductRatings: async (productIds) => {
    try {
      const response = await apiClient.post('/products/ratings', { productIds });
      return response.data;
    } catch (error) {
      console.error('상품 평점/리뷰 조회 실패:', error);
      throw error;
    }
  },

  // 찜하기/취소
  toggleWishlist: async (productId) => {
    try {
      const response = await apiClient.post(`/products/${productId}/wishlist`);
      return response.data;
    } catch (error) {
      console.error('찜하기 토글 실패:', error);
      throw error;
    }
  },

  // 찜 목록 조회
  getWishlist: async () => {
    try {
      const response = await apiClient.get('/products/wishlist');
      return response.data;
    } catch (error) {
      console.error('찜 목록 조회 실패:', error);
      throw error;
    }
  },
};
