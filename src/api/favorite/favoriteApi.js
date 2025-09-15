import { apiClient } from './config';

// 찜 추가
export const addFavorite = (data) => apiClient.post('/favorites', data);

// 찜 삭제
export const removeFavorite = (data) => apiClient.delete('/favorites', { data });

// 유저별 찜 목록 조회
export const getUserFavorites = (userNum) => apiClient.get(`/favorites/${userNum}`);

// 유저 찜 개수
export const getUserFavoriteCount = (userNum) => apiClient.get(`/favorites/user/${userNum}/count`);

// 특정 상품 찜 개수
export const getProductFavoriteCount = (productNum) => apiClient.get(`/favorites/product/${productNum}/count`);
