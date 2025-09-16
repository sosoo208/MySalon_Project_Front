import { apiClient } from '../config';

export const favoriteApi = {
  addFavorite: async (data) => {
    try {
      const response = await apiClient.post('/favorites', data);
      return response.data;
    } catch (error) {
      console.error('찜 추가 실패:', error);
      throw error;
    }
  },

  removeFavorite: async (data) => {
    try {
      const response = await apiClient.delete('/favorites', { data });
      return response.data;
    } catch (error) {
      console.error('찜 삭제 실패:', error);
      throw error;
    }
  },

  getUserFavorites: async (userNum) => {
    try {
      const response = await apiClient.get(`/favorites/${userNum}`);
      return response.data;
    } catch (error) {
      console.error('유저 찜 목록 조회 실패:', error);
      throw error;
    }
  },

  getUserFavoriteCount: async (userNum) => {
    try {
      const response = await apiClient.get(`/favorites/user/${userNum}/count`);
      return response.data;
    } catch (error) {
      console.error('유저 찜 개수 조회 실패:', error);
      throw error;
    }
  },

  getProductFavoriteCount: async (productNum) => {
    try {
      const response = await apiClient.get(`/favorites/product/${productNum}/count`);
      return response.data;
    } catch (error) {
      console.error('상품 찜 개수 조회 실패:', error);
      throw error;
    }
  },
};
