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

// ===== 사용자 페이지 =====
import MyPage from "./pages/user/MyPage";
import ProfileEdit from "./pages/user/ProfileEdit";
import OrderList from "./pages/user/OrderList";

// ===== 관리자/판매자 페이지 =====
import AdminMyPage from "./pages/admin/AdminMyPage";
import ProductRegister from "./pages/admin/ProductRegister";
import ProductList from "./pages/admin/ProductList";
import ProductDetail from "./pages/admin/ProductDetail";

// ===== 커뮤니티 페이지 =====
import CommunityPage from "./pages/community/CommunityPage";

// ===== 기타 컴포넌트 =====
import { ScrollContainer } from "./components/ScrollContainer";

// ✅ 역할 가져오기 (안전하게 처리)
const getRole = () => {
  const role = localStorage.getItem("role");
  return role ? role.toUpperCase() : null; // "BUYER" | "SELLER" | null
};

// ✅ 역할별 렌더링
function RoleElement({ buyer, seller, fallback = null }) {
  const role = getRole();
  if (role === "SELLER") return seller ?? fallback;
  if (role === "BUYER") return buyer ?? fallback;
  return fallback;
}

// ✅ 접근 차단용
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
      <Route path="/cart" element={<CartPage />} />

      {/* ===== 인증 ===== */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ===== 마이페이지 (구매자/판매자 공용) ===== */}
      <Route
        path="/mypage"
        element={<RoleElement buyer={<MyPage />} seller={<AdminMyPage />} />}
      />
      <Route path="/mypage/edit" element={<ProfileEdit />} />
      <Route path="/mypage/orders" element={<OrderList />} />

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
        path="/admin/products/list"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <ProductList />
          </BlockRole>
        }
      />
      <Route
        path="/admin/products/:id"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <ProductDetail />
          </BlockRole>
        }
      />

      {/* ===== 카테고리 ===== */}
      <Route path="/category/아우터" element={<OuterPage />} />
      <Route path="/category/바지" element={<PantsPage />} />
      <Route path="/category/원피스" element={<DressPage />} />

      {/* ===== 커뮤니티 ===== */}
      <Route path="/community" element={<CommunityPage />} />

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
