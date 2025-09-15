import { apiClient } from '../config';

export const userApi = {
  createUser: async (data) => {
    try {
      const response = await apiClient.post('/users', data);
      return response.data;
    } catch (error) {
      console.error('회원가입 실패:', error);
      throw error;
    }
  },

  editUser: async (data) => {
    try {
      const response = await apiClient.put('/users/edit-profile', data);
      return response.data;
    } catch (error) {
      console.error('회원 수정 실패:', error);
      throw error;
    }
  },

  deleteUser: async (userNum) => {
    try {
      const response = await apiClient.delete(`/users/${userNum}`);
      return response.data;
    } catch (error) {
      console.error('회원 삭제 실패:', error);
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('전체 유저 조회 실패:', error);
      throw error;
    }
  },

  getUserByUserNum: async (userNum) => {
    try {
      const response = await apiClient.get(`/users/${userNum}`);
      return response.data;
    } catch (error) {
      console.error('특정 유저 조회 실패:', error);
      throw error;
    }
  },

  getUserInfo: async () => {
    try {
      const response = await apiClient.get('/users/user-info');
      return response.data;
    } catch (error) {
      console.error('로그인 유저 정보 조회 실패:', error);
      throw error;
    }
  },

  login: async (data) => {
    try {
      const response = await apiClient.post('/users/login', data);
      return response.data;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  },
};
