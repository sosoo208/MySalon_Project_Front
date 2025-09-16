// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import { OutfitProvider } from "./context/OutfitContext";
import { BoardProvider } from "./context/BoardContext";

// ===== 인증 =====
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";

// ===== 랜딩 + Shop =====
import LandingWithShop from "./pages/LandingWithShop";

// ===== 쇼핑 =====
import ShopPage from "./pages/shop/ShopPage";
import OuterPage from "./pages/shop/OuterPage";
import PantsPage from "./pages/shop/PantsPage";
import DressPage from "./pages/shop/DressPage";
import TopPage from "./pages/shop/TopPage";
import KidsPage from "./pages/shop/KidsPage";
import MalePage from "./pages/shop/MalePage";
import FemalePage from "./pages/shop/FemalePage";
import HomewearPage from "./pages/shop/HomewearPage";
import CartPage from "./pages/cart/CartPage";
import ProductDetail from "./pages/shop/ProductDetail";
import OrderComplete from "./pages/order/OrderComplete";

// ===== 사용자/판매자 =====
import MyPage from "./pages/user/MyPage";
import ProfileEdit from "./pages/user/ProfileEdit";
import OrderList from "./pages/user/OrderList";
import FavoriteList from "./pages/user/FavoriteList";
import MyReviewPage from "./pages/user/MyReviewPage";
import ReviewWritePage from "./pages/user/ReviewWritePage";
import ReviewEditPage from "./pages/user/ReviewEditPage";
import AdminMyPage from "./pages/admin/AdminMyPage";
import ProductRegister from "./pages/admin/ProductRegister";
import ProductList from "./pages/admin/ProductList";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import SalesList from "./pages/admin/SalesList";
import OrderShipping from "./pages/admin/OrderShipping";
import Sales from "./pages/admin/Sales";

// ===== 커뮤니티 =====
import CommunityPage from "./pages/community/CommunityPage";
import CoordiWritePage from "./pages/community/CoordiWritePage";
import BoardPage from "./pages/community/BoardPage";
import BoardDetailPage from "./pages/community/BoardDetailPage";
import BoardWritePage from "./pages/community/BoardWritePage";
import CoordiDetail from "./pages/community/CoordiDetail";

const getRole = () => {
  const role = localStorage.getItem("role");
  return role ? role.toUpperCase() : null;
};

function RoleElement({ buyer, seller, fallback = <Navigate to="/login" replace /> }) {
  const role = getRole();
  if (role === "SELLER") return seller ?? fallback;
  if (role === "BUYER") return buyer ?? fallback;
  return fallback;
}

function BlockRole({ denied = [], children, redirectTo }) {
  const role = getRole();
  if (!role) return <Navigate to="/login" replace />;
  if (denied.includes(role)) {
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
      {/* 랜딩 */}
      <Route path="/" element={<LandingWithShop />} />

      {/* 쇼핑 */}
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order/complete" element={<OrderComplete />} />

      {/* 인증 */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 마이페이지 */}
      <Route
        path="/mypage"
        element={
          <RoleElement
            buyer={<MyPage />}
            seller={<AdminMyPage />}
            fallback={<Navigate to="/login" replace />}
          />
        }
      />
      <Route path="/mypage/edit" element={<ProfileEdit />} />
      <Route path="/mypage/orders" element={<OrderList />} />
      <Route path="/mypage/favorites" element={<FavoriteList />} />
      <Route path="/mypage/reviews" element={<MyReviewPage />} />
      <Route path="/mypage/reviews/write/:productId" element={<ReviewWritePage />} />
      <Route path="/mypage/reviews/edit/:reviewId" element={<ReviewEditPage />} />

      {/* 판매자(Admin) */}
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
        path="/admin/products/list"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <ProductList />
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

      {/* 카테고리 */}
      <Route path="/category/바지" element={<PantsPage />} />
      <Route path="/category/상의" element={<TopPage />} />
      <Route path="/category/남성" element={<MalePage />} />
      <Route path="/category/여성" element={<FemalePage />} />
      <Route path="/category/키즈" element={<KidsPage />} />
      <Route path="/category/아우터" element={<OuterPage />} />
      <Route path="/category/원피스/스커트" element={<DressPage />} />
      <Route path="/category/홈웨어" element={<HomewearPage />} />

      {/* 커뮤니티 */}
      <Route path="/community" element={<CommunityPage />} />
      {/* ✅ 오입력 대비 안전 리다이렉트 */}
      <Route path="/community/write" element={<Navigate to="/coordi/write" replace />} />
      <Route path="/community/:id" element={<CoordiDetail />} />
      <Route path="/coordi/write" element={<CoordiWritePage />} />

      <Route path="/board" element={<BoardPage />} />
      <Route path="/board/write" element={<BoardWritePage />} />
      <Route path="/board/edit/:id" element={<BoardWritePage />} />
      <Route path="/board/:id" element={<BoardDetailPage />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <RoleElement
            buyer={<Navigate to="/shop" replace />}
            seller={<Navigate to="/admin-mypage" replace />}
            fallback={<Navigate to="/login" replace />}
          />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <OutfitProvider>
        <BoardProvider>
          <AppContent />
        </BoardProvider>
      </OutfitProvider>
    </AuthProvider>
  );
}
