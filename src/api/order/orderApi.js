import { apiClient } from '../config';

export const orderApi = {
  createOrder: async (data) => {
    try {
      const response = await apiClient.post('/orders', data);
      return response.data;
    } catch (error) {
      console.error('주문 생성 실패:', error);
      throw error;
    }
  },

  createOrder2: async (data) => {
    try {
      const response = await apiClient.post('/orders/create', data);
      return response.data;
    } catch (error) {
      console.error('주문 생성2 실패:', error);
      throw error;
    }
  },

  getOrdersCount: async () => {
    try {
      const response = await apiClient.get('/orders/count');
      return response.data;
    } catch (error) {
      console.error('주문 개수 조회 실패:', error);
      throw error;
    }
  },

  getAllOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      console.error('전체 주문 조회 실패:', error);
      throw error;
    }
  },

  getAllOrdersByUser: async () => {
    try {
      const response = await apiClient.get('/orders/user/');
      return response.data;
    } catch (error) {
      console.error('유저 주문 조회 실패:', error);
      throw error;
    }
  },

  getOrdersByUser: async () => {
    try {
      const response = await apiClient.get('/orders/user2/');
      return response.data;
    } catch (error) {
      console.error('유저 주문 조회2 실패:', error);
      throw error;
    }
  },

  updateOrder: async (orderId, data) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}`, data);
      return response.data;
    } catch (error) {
      console.error('주문 수정 실패:', error);
      throw error;
    }
  },

  patchOrder: async (orderId, data) => {
    try {
      const response = await apiClient.patch(`/orders/${orderId}`, data);
      return response.data;
    } catch (error) {
      console.error('주문 부분 수정 실패:', error);
      throw error;
    }
  },

  deleteOrder: async (orderId) => {
    try {
      const response = await apiClient.delete(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('주문 삭제 실패:', error);
      throw error;
    }
  },

  searchOrdersByProductName: async (query) => {
    try {
      const response = await apiClient.get(`/orders/search/by-name?query=${query}`);
      return response.data;
    } catch (error) {
      console.error('상품명으로 주문 검색 실패:', error);
      throw error;
    }
  },

  searchOrdersByUserNum: async (userNum) => {
    try {
      const response = await apiClient.get(`/orders/search/by-user/${userNum}`);
      return response.data;
    } catch (error) {
      console.error('유저 번호로 주문 검색 실패:', error);
      throw error;
    }
  },

  searchOrdersByProductNum: async (productNum) => {
    try {
      const response = await apiClient.get(`/orders/search/by-product/${productNum}`);
      return response.data;
    } catch (error) {
      console.error('상품 번호로 주문 검색 실패:', error);
      throw error;
    }
  },
};
