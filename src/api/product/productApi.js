import { apiClient } from '../config';

export const productApi = {
  createProduct: async (data) => {
    try {
      const response = await apiClient.post('/products', data);
      return response.data;
    } catch (error) {
      console.error('상품 생성 실패:', error);
      throw error;
    }
  },

  // 상품 등록
  createProduct2: async (formData) => {
  const response = await apiClient.post('/products/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
},

  updateProduct: async (productId, data) => {
    try {
      const response = await apiClient.put(`/products/${productId}`, data);
      return response.data;
    } catch (error) {
      console.error('상품 수정 실패:', error);
      throw error;
    }
  },

  patchProduct: async (productId, data) => {
    try {
      const response = await apiClient.patch(`/products/${productId}`, data);
      return response.data;
    } catch (error) {
      console.error('상품 부분 수정 실패:', error);
      throw error;
    }
  },

  updateProduct2: async (productId, data) => {
    try {
      const response = await apiClient.patch(`/products/update/${productId}`, data);
      return response.data;
    } catch (error) {
      console.error('상품 수정2 실패:', error);
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await apiClient.delete(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('상품 삭제 실패:', error);
      throw error;
    }
  },

  searchProducts: async (params) => {
    try {
      const response = await apiClient.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('상품 검색 실패:', error);
      throw error;
    }
  },

  getAllProductsByUser: async (userId) => {
    try {
      const response = await apiClient.get(`/products/my-products`);
      return response.data;
    } catch (error) {
      console.error('유저별 상품 조회 실패:', error);
      throw error;
    }
  },

  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products/all-products');
      return response.data;
    } catch (error) {
      console.error('전체 상품 조회 실패:', error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    try {
      const response = await apiClient.get(`/products/detail/${productId}`);
      return response.data;
    } catch (error) {
      console.error('상품 상세 조회 실패:', error);
      throw error;
    }
  },
};
