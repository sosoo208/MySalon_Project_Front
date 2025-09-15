// API 모듈 통합 export
export { authApi } from './auth/authApi.js';
export { userApi } from './users/userApi.js';
export { productApi } from './products/productApi.js';
export { orderApi } from './orders/orderApi.js';
export { communityApi } from './community/communityApi.js';

// 공통 axios 클라이언트 & base URL
export { apiClient, API_BASE_URL } from './config.js';
