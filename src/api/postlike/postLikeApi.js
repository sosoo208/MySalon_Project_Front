import { apiClient } from '../config';

export const postLikeApi = {
  clickLike: async (data) => {
    try {
      const response = await apiClient.put('/post-likes', data);
      return response.data;
    } catch (error) {
      console.error('게시글 좋아요 실패:', error);
      throw error;
    }
  },

  isPostLikedByUser: async (postId, userId) => {
    try {
      const response = await apiClient.get(`/post-likes?postId=${postId}&userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('게시글 좋아요 여부 조회 실패:', error);
      throw error;
    }
  },
};
