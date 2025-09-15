// 사용자 관련 API
import { apiClient } from '../config.js';

export const userApi = {
  // 사용자 정보 조회
  getUserInfo: async () => {
    const response = await apiClient.get('/users/user-info');
    return response.data;
  },

  // 사용자 정보 수정
  updateUserInfo: async (userData) => {
    const response = await apiClient.put('/users/user-info', userData);
    return response.data;
  },

  // 프로필 이미지 업로드
  uploadProfileImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await apiClient.post('/users/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (passwordData) => {
    const response = await apiClient.put('/users/password', passwordData);
    return response.data;
  },
};
