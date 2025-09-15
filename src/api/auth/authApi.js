// 인증 관련 API
import { apiClient } from '../config.js';

export const authApi = {
  // 로그인
  login: async (id, password) => {
    try {
      const response = await apiClient.post('/users/login', { id, password });
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },

  // 회원가입
  signup: async (userData) => {
    try {
      const response = await apiClient.post('/users/signup', userData);
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      const response = await apiClient.post('/users/logout');
      return response.data;
    } catch (error) {
      console.error('로그아웃 실패:', error);
      throw error;
    }
  },

  // 토큰 검증
  verifyToken: async () => {
    try {
      const response = await apiClient.get('/users/verify');
      return response.data;
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      throw error;
    }
  },
};