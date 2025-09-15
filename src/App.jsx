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
import CartPage from "./pages/cart/CartPage";   // ✅ 장바구니 추가

// ===== 사용자 페이지 =====
import MyPage from "./pages/user/MyPage";
import ProfileEdit from "./pages/user/ProfileEdit"; // ✅ 프로필 수정 페이지 추가

// ===== 관리자 페이지 =====
import AdminMyPage from "./pages/admin/AdminMyPage";

// ===== 커뮤니티 페이지 =====
import CommunityPage from "./pages/community/CommunityPage";

// ===== 기타 컴포넌트 =====
import { ScrollContainer } from "./components/ScrollContainer";

/* ---------------------------
   역할 헬퍼 & 가드 컴포넌트
----------------------------*/
const getRole = () => localStorage.getItem("role"); // "BUYER" | "SELLER" | null

function RoleElement({ buyer, seller, fallback = null }) {
  const role = getRole();
  if (role === "SELLER") return seller ?? fallback;
  return buyer ?? fallback; // 기본은 구매자
}

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
      {/* 랜딩/공용 */}
      <Route path="/" element={<ScrollContainer />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* 인증 */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 마이페이지 */}
      <Route
        path="/mypage"
        element={<RoleElement buyer={<MyPage />} seller={<AdminMyPage />} />}
      />
      {/* ✅ 프로필 수정 라우트 추가 */}
      <Route path="/mypage/edit" element={<ProfileEdit />} />

      {/* 판매자 전용 마이페이지: 구매자 차단 */}
      <Route
        path="/admin-mypage"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <AdminMyPage />
          </BlockRole>
        }
      />

      {/* 카테고리 페이지 */}
      <Route path="/category/아우터" element={<OuterPage />} />
      <Route path="/category/바지" element={<PantsPage />} />
      <Route path="/category/원피스" element={<DressPage />} />

      {/* 커뮤니티 */}
      <Route path="/community" element={<CommunityPage />} />

      {/* 존재하지 않는 경로 */}
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
