import { apiClient } from '../config';

export const postApi = {
  createPost: async (data) => {
    try {
      const response = await apiClient.post('/posts', data);
      return response.data;
    } catch (error) {
      console.error('게시글 생성 실패:', error);
      throw error;
    }
  },

  createCoordiPost: async (data) => {
    try {
      const response = await apiClient.post('/posts/coordi', data);
      return response.data;
    } catch (error) {
      console.error('코디 게시글 생성 실패:', error);
      throw error;
    }
  },

  getAllPost: async () => {
    try {
      const response = await apiClient.get('/posts');
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  getAllCoordiPost: async () => {
    try {
      const response = await apiClient.get('/posts/coordi');
      return response.data;
    } catch (error) {
      console.error('코디 게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  getHotCoordiPost: async () => {
    try {
      const response = await apiClient.get('/posts/hot-coordi');
      return response.data;
    } catch (error) {
      console.error('인기 코디 게시글 조회 실패:', error);
      throw error;
    }
  },

  getPostDetail: async (postId) => {
    try {
      const response = await apiClient.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },

  deletePost: async (postNum) => {
    try {
      const response = await apiClient.delete(`/posts/${postNum}`);
      return response.data;
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      throw error;
    }
  },
};
