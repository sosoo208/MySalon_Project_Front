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
import TopPage from "./pages/shop/TopPage";
import KidsPage from "./pages/shop/KidsPage";
import MalePage from "./pages/shop/MalePage";
import FemalePage from "./pages/shop/FemalePage";

// ===== 장바구니 페이지 =====
import CartPage from "./pages/cart/CartPage";   // ✅ 장바구니 페이지
import ProductDetail from "./pages/shop/ProductDetail"; 
import OrderComplete from "./pages/order/OrderComplete"; // ✅ 주문 완료 페이지


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
import ProductList from "./pages/admin/ProductList";
import AdminProductDetail from "./pages/admin/AdminProductDetail"; 
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
  return role ? role.toUpperCase() : null;
};

// ✅ 역할별 렌더링
function RoleElement({ buyer, seller, fallback = <Navigate to="/login" replace /> }) {
  const role = getRole();

  if (role === "SELLER") return seller ?? fallback;
  if (role === "BUYER") return buyer ?? fallback;
  return fallback; // 로그인 안 되어 있으면 fallback으로
}


// ✅ 접근 차단
function BlockRole({ denied = [], children, redirectTo }) {
  const role = getRole();
  if (!role) {
    return <Navigate to="/login" replace />;
  }
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
      {/* 랜딩/공용 */}
      <Route path="/" element={<ScrollContainer />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/shop/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/order/complete" element={<OrderComplete />} /> {/* ✅ 주문 완료 */}

      {/* 인증 */}
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />


      {/* ===== 마이페이지 ===== */}
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


      {/* 판매자 전용 마이페이지 */}
      <Route
        path="/admin-mypage"
        element={
          <BlockRole denied={["BUYER"]} redirectTo="/mypage">
            <AdminMyPage />
          </BlockRole>
        }
      />
      {/* 상품 등록 페이지 */}
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

      {/* ===== 카테고리 ===== */}
      <Route path="/category/바지" element={<PantsPage />} />
      <Route path="/category/상의" element={<TopPage />} />
      <Route path="/category/남성" element={<MalePage />} />
      <Route path="/category/여성" element={<FemalePage />} />
      <Route path="/category/키즈" element={<KidsPage />} />

      <Route path="/category/아우터" element={<OuterPage />} />
      <Route path="/category/원피스/스커트" element={<DressPage />} />


      

      {/* 커뮤니티 */}
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/coordi/write" element={<CoordiWritePage />} />
      <Route path="/board" element={<BoardPage />} />
      <Route path="/board/:id" element={<BoardDetailPage />} />
      <Route path="/board/write" element={<BoardWritePage />} />

      {/* 존재하지 않는 경로 */}
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
      <AppContent />
    </AuthProvider>
  );
}
