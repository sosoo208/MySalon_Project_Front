import { apiClient } from '../config';

// named export 유지
export const productDetailApi  = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/product-details');
      return res.data;
    } catch (err) {
      console.error('전체 상품 상세 조회 실패:', err);
      throw err;
    }
  },

  create: async (data) => {
    try {
      const res = await apiClient.post('/product-details', data);
      return res.data;
    } catch (err) {
      console.error('상품 상세 생성 실패:', err);
      throw err;
    }
  },

  update: async (id, data) => {
    try {
      const res = await apiClient.put(`/product-details/${id}`, data);
      return res.data;
    } catch (err) {
      console.error('상품 상세 수정 실패:', err);
      throw err;
    }
  },

  patch: async (id, data) => {
    try {
      const res = await apiClient.patch(`/product-details/${id}`, data);
      return res.data;
    } catch (err) {
      console.error('상품 상세 부분 수정 실패:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const res = await apiClient.delete(`/product-details/${id}`);
      return res.data;
    } catch (err) {
      console.error('상품 상세 삭제 실패:', err);
      throw err;
    }
  },

  getByDetailNum: async (id) => {
    try {
      const res = await apiClient.get(`/product-details/${id}`);
      return res.data;
    } catch (err) {
      console.error('상품 상세 번호 조회 실패:', err);
      throw err;
    }
  },

  getByProductNum: async (productNum) => {
    try {
      const res = await apiClient.get(`/product-details/product/${productNum}`);
      return res.data;
    } catch (err) {
      console.error('상품 번호로 상세 조회 실패:', err);
      throw err;
    }
  },

  getByUserNum: async (userNum) => {
    try {
      const res = await apiClient.get(`/product-details/user/${userNum}`);
      return res.data;
    } catch (err) {
      console.error('유저 번호로 상품 상세 조회 실패:', err);
      throw err;
    }
  },

  getByColor: async (color) => {
    try {
      const res = await apiClient.get(`/product-details/search/by-color?color=${color}`);
      return res.data;
    } catch (err) {
      console.error('색상으로 상품 상세 조회 실패:', err);
      throw err;
    }
  },

  getByColorAndSize: async (color, size) => {
    try {
      const res = await apiClient.get(`/product-details/search/by-color-and-size?color=${color}&size=${size}`);
      return res.data;
    } catch (err) {
      console.error('색상과 사이즈로 상품 상세 조회 실패:', err);
      throw err;
    }
  },

  search: async (params) => {
    try {
      const res = await apiClient.get('/product-details/search', { params });
      return res.data;
    } catch (err) {
      console.error('상품 상세 검색 실패:', err);
      throw err;
    }
  },
};
