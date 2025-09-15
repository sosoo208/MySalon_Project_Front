import { apiClient } from '../config';

export const shoppingCartApi = {
  addToCart: async (data) => {
    try {
      const response = await apiClient.post('/cart', data);
      return response.data;
    } catch (error) {
      console.error('장바구니 추가 실패:', error);
      throw error;
    }
  },

  removeFromCart: async (data) => {
    try {
      const response = await apiClient.delete('/cart', { data });
      return response.data;
    } catch (error) {
      console.error('장바구니 삭제 실패:', error);
      throw error;
    }
  },

  getUserCart: async () => {
    try {
      const response = await apiClient.get('/cart/user-cart');
      return response.data;
    } catch (error) {
      console.error('유저 장바구니 조회 실패:', error);
      throw error;
    }
  },

  updateCartSelection: async (params) => {
    try {
      const response = await apiClient.patch('/cart/selection', null, { params });
      return response.data;
    } catch (error) {
      console.error('장바구니 선택 변경 실패:', error);
      throw error;
    }
  },

  getTotalPrice: async () => {
    try {
      const response = await apiClient.get('/cart/total');
      return response.data;
    } catch (error) {
      console.error('장바구니 총합 조회 실패:', error);
      throw error;
    }
  },

  updateItemCount: async (params) => {
    try {
      const response = await apiClient.patch('/cart/update-count', null, { params });
      return response.data;
    } catch (error) {
      console.error('장바구니 수량 변경 실패:', error);
      throw error;
    }
  },
};
