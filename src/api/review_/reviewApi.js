import { apiClient } from '../config';

export const reviewApi = {
  createReview: async (productDetailNum, formData) => {
    try {
      const response = await apiClient.post(`/reviews/${productDetailNum}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      console.error('리뷰 생성 실패:', error);
      throw error;
    }
  },

  editReview: async (reviewNum, data) => {
    try {
      const response = await apiClient.put(`/reviews/${reviewNum}`, data);
      return response.data;
    } catch (error) {
      console.error('리뷰 수정 실패:', error);
      throw error;
    }
  },

  deleteReview: async (reviewNum) => {
    try {
      const response = await apiClient.delete(`/reviews/${reviewNum}`);
      return response.data;
    } catch (error) {
      console.error('리뷰 삭제 실패:', error);
      throw error;
    }
  },

  getUserReviews: async (userNum) => {
    try {
      const response = await apiClient.get(`/reviews/user/${userNum}`);
      return response.data;
    } catch (error) {
      console.error('유저 리뷰 조회 실패:', error);
      throw error;
    }
  },

  getReviewsByProduct: async (productNum) => {
    try {
      const response = await apiClient.get(`/reviews/product/${productNum}`);
      return response.data;
    } catch (error) {
      console.error('상품 리뷰 조회 실패:', error);
      throw error;
    }
  },

  getUserReviewsForProduct: async (userNum, productNum) => {
    try {
      const response = await apiClient.get(`/reviews/user/${userNum}/product/${productNum}`);
      return response.data;
    } catch (error) {
      console.error('유저별 상품 리뷰 조회 실패:', error);
      throw error;
    }
  },

  getReviewsByUserSpecForProduct: async (productNum, params) => {
    try {
      const response = await apiClient.get(`/reviews/filter-by-spec/product/${productNum}`, { params });
      return response.data;
    } catch (error) {
      console.error('상품 스펙별 리뷰 조회 실패:', error);
      throw error;
    }
  },

  getReviewsByProductSortedByScore: async (productNum) => {
    try {
      const response = await apiClient.get(`/reviews/product/${productNum}/by-score`);
      return response.data;
    } catch (error) {
      console.error('상품 리뷰 점수별 조회 실패:', error);
      throw error;
    }
  },

  getAverageScore: async (productNum) => {
    try {
      const response = await apiClient.get(`/reviews/product/${productNum}/average-score`);
      return response.data;
    } catch (error) {
      console.error('상품 평균 점수 조회 실패:', error);
      throw error;
    }
  },

  getUserReviewCount: async (userNum) => {
    try {
      const response = await apiClient.get(`/reviews/user/${userNum}/count`);
      return response.data;
    } catch (error) {
      console.error('유저 리뷰 개수 조회 실패:', error);
      throw error;
    }
  },

  getProductReviewCount: async (productNum) => {
    try {
      const response = await apiClient.get(`/reviews/product/${productNum}/count`);
      return response.data;
    } catch (error) {
      console.error('상품 리뷰 개수 조회 실패:', error);
      throw error;
    }
  },
};
