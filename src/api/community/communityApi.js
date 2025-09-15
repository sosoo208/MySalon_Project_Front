// 커뮤니티 관련 API
import { apiClient } from '../config.js';

export const communityApi = {
  // 게시글 목록 조회
  getPosts: async (params = {}) => {
    try {
      const response = await apiClient.get('/posts/hot-coordi', { params });
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  getPostDetail: async (postId) => {
    try {
      const response = await apiClient.get(`/community/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 작성
  createPost: async (postData) => {
    try {
      const response = await apiClient.post('/community/posts', postData);
      return response.data;
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      throw error;
    }
  },

  // 게시글 수정
  updatePost: async (postId, postData) => {
    try {
      const response = await apiClient.put(`/community/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      throw error;
    }
  },

  // 게시글 삭제
  deletePost: async (postId) => {
    try {
      const response = await apiClient.delete(`/community/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      throw error;
    }
  },

  // 댓글 목록 조회
  getComments: async (postId) => {
    try {
      const response = await apiClient.get(`/community/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 댓글 작성
  createComment: async (postId, commentData) => {
    try {
      const response = await apiClient.post(`/community/posts/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      throw error;
    }
  },

  // 댓글 수정
  updateComment: async (postId, commentId, commentData) => {
    try {
      const response = await apiClient.put(`/community/posts/${postId}/comments/${commentId}`, commentData);
      return response.data;
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (postId, commentId) => {
    try {
      const response = await apiClient.delete(`/community/posts/${postId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      throw error;
    }
  },

  // 좋아요 토글
  toggleLike: async (postId) => {
    try {
      const response = await apiClient.post(`/community/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
      throw error;
    }
  },
};
