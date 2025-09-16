import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";

// ===== 인증 페이지 =====
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

// ===== 쇼핑 페이지 =====
import ShopPage from "./pages/shop/ShopPage";
import OuterPage from "./pages/shop/OuterPage";
import PantsPage from "./pages/shop/PantsPage";
import DressPage from "./pages/shop/DressPage";
import CartPage from "./pages/cart/CartPage";
import ProductDetail from "./pages/shop/ProductDetail"; // ✅ 구매자용 상품 상세

// ===== 사용자(구매자) 페이지 =====
import MyPage from "./pages/user/MyPage";
import ProfileEdit from "./pages/user/ProfileEdit";
import OrderList from "./pages/user/OrderList";
import FavoriteList from "./pages/user/FavoriteList";
import MyReviewPage from "./pages/user/MyReviewPage";
import ReviewWritePage from "./pages/user/ReviewWritePage"; 
import ReviewEditPage from "./pages/user/ReviewEditPage";   

// ===== 판매자(Admin) 페이지 =====
import AdminMyPage from "./pages/admin/AdminMyPage";
import ProductRegister from "./pages/admin/ProductRegister";
import AdminProductDetail from "./pages/admin/AdminProductDetail"; // ✅ 관리자 상품 상세
import SalesList from "./pages/admin/SalesList";
import OrderShipping from "./pages/admin/OrderShipping";
import Sales from "./pages/admin/Sales";

// ===== 커뮤니티 페이지 =====
import CommunityPage from "./pages/community/CommunityPage";
import CoordiWritePage from "./pages/community/CoordiWritePage";
import BoardPage from "./pages/community/BoardPage";
import BoardDetailPage from "./pages/community/BoardDetailPage";
import BoardWritePage from "./pages/community/BoardWritePage";

// ===== 기타 컴포넌트 =====
import { ScrollContainer } from "./components/ScrollContainer";

// ✅ 역할 가져오기
const getRole = () => {
  const role = localStorage.getItem("role");
  return role ? role.toUpperCase() : null; // 필요시 toUpperCase() 제거 가능
};

// ✅ 역할별 렌더링
function RoleElement({ buyer, seller, fallback = null }) {
  const role = getRole();
  if (role === "SELLER") return seller ?? fallback;
  if (role === "BUYER") return buyer ?? fallback;
  return fallback;
}

// ✅ 접근 차단
function BlockRole({ denied = [], children, redirectTo }) {
  const role = getRole();
  if (role && denied.includes(role)) {
    return (
      <Navigate
        to={redirectTo ?? (role === "SELLER" ? "/admin-mypage" : "/shop")}
        replace
      />
    );
  }
  return children;
}

function AppContent() {
  return (
    <Routes>
      {/* ===== 랜딩/공용 ===== */}
      <Route path="/" element={<ScrollContainer />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:id" element={<ProductDetail />} /> {/* ✅ 구매자 상품 상세 */}
      <Route path="/cart" element={<CartPage />} />

      {/* ===== 인증 ===== */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ===== 마이페이지 ===== */}
      <Route
        path="/mypage"
        element={<RoleElement buyer={<MyPage />} seller={<AdminMyPage />} />}
      />
      <Route path="/mypage/edit" element={<ProfileEdit />} />
      <Route path="/mypage/orders" element={<OrderList />} />
      <Route path="/mypage/favorites" element={<FavoriteList />} />
      <Route path="/mypage/reviews" element={<MyReviewPage />} />
      <Route path="/mypage/reviews/write/:productId" element={<ReviewWritePage />} />
      <Route path="/mypage/reviews/edit/:reviewId" element={<ReviewEditPage />} />

      {/* ===== 판매자 전용 ===== */}
      <Route
        path="/admin-mypage"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <AdminMyPage />
          </BlockRole>
        }
      />
      <Route
        path="/admin/products/register"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <ProductRegister />
          </BlockRole>
        }
      />
      
      <Route
        path="/admin/products/sales-list"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <SalesList />
          </BlockRole>
        }
      />
      <Route
        path="/admin/products/order-shipping"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <OrderShipping />
          </BlockRole>
        }
      />
      <Route
        path="/admin/products/sales"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <Sales />
          </BlockRole>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <AdminProductDetail />
          </BlockRole>
        }
      />

      {/* ===== 카테고리 ===== */}
      <Route path="/category/아우터" element={<OuterPage />} />
      <Route path="/category/바지" element={<PantsPage />} />
      <Route path="/category/원피스" element={<DressPage />} />

      {/* ===== 커뮤니티 ===== */}
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/coordi/write" element={<CoordiWritePage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/board/:id" element={<BoardDetailPage />} />
      <Route path="/board/write" element={<BoardWritePage />} />

      {/* ===== 없는 경로 ===== */}
      <Route
        path="*"
        element={
          <RoleElement
            buyer={<Navigate to="/shop" replace />}
            seller={<Navigate to="/admin-mypage" replace />}
            fallback={<Navigate to="/shop" replace />}
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
