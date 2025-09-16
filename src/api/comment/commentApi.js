import { apiClient } from '../config';

export const commentApi = {
  // 댓글 생성
  createComment: async (data) => {
    try {
      const response = await apiClient.post('/comments', data);
      return response.data;
    } catch (error) {
      console.error('댓글 생성 실패:', error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (commentNum) => {
    try {
      const response = await apiClient.delete(`/comments/${commentNum}`);
      return response.data;
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      throw error;
    }
  },
};
