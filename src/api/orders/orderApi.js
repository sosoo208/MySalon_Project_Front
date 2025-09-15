// 주문 관련 API
import { apiClient } from '../config.js';

export const orderApi = {
  // 주문 생성
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('주문 생성 실패:', error);
      throw error;
    }
  },

  // 주문 목록 조회
  getOrders: async (params = {}) => {
    try {
      const response = await apiClient.get('/orders', { params });
      return response.data;
    } catch (error) {
      console.error('주문 목록 조회 실패:', error);
      throw error;
    }
  },

  // 주문 상세 조회
  getOrderDetail: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('주문 상세 조회 실패:', error);
      throw error;
    }
  },

  // 주문 상태 변경 (판매자용)
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('주문 상태 변경 실패:', error);
      throw error;
    }
  },

  // 주문 취소
  cancelOrder: async (orderId) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('주문 취소 실패:', error);
      throw error;
    }
  },

  // 결제 처리
  processPayment: async (paymentData) => {
    try {
      const response = await apiClient.post('/orders/payment', paymentData);
      return response.data;
    } catch (error) {
      console.error('결제 처리 실패:', error);
      throw error;
    }
  },
};
