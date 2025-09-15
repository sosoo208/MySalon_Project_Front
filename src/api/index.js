// API 모듈 통합 export
export { authApi } from './auth/authApi.js';
export { commentApi } from './comment/commentApi.js';
export { favoriteApi } from './favorite/favoriteApi.js';
export { orderApi } from './order/orderApi.js';
export { postApi } from './post_/postApi.js';
export { postLikeApi } from './postlike/postLikeApi.js';
export { productApi } from './product/productApi.js';
export { productDetailApi } from './productDetail/productDetailApi.js'; // 이름 일치
export { reviewApi } from './review_/reviewApi.js';
export { shoppingCartApi } from './shoppingCart/shoppingCartApi.js';
export { userApi } from './user/userApi.js';

// 공통 axios 클라이언트 & base URL
export { apiClient, API_BASE_URL } from './config.js';
