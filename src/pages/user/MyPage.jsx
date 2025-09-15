import React, { useState } from "react";
import { SubHeader } from "../../components/SubHeader"; // ✅ 헤더 통일

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("posts"); // posts or comments

  return (
    <>
      {/* 상단 헤더 */}
      <SubHeader />

      <div style={{ display: "flex", padding: "40px", background: "#f5f5f5" }}>
        {/* ✅ 왼쪽 프로필 + 메뉴 */}
        <div style={{ width: "250px", marginRight: "40px", textAlign: "left" }}>
          {/* 프로필 */}
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#ddd",
                marginBottom: "10px",
              }}
            />
            <div style={{ fontWeight: "bold", marginBottom: "6px" }}>HONG1234</div>
            <div style={{ fontSize: "12px", color: "#555", marginBottom: "6px" }}>
              가입일 2025.09.07 <br /> 최근 접속일 2025.09.07 <br />
              180cm / 70kg
            </div>
            <button
              style={{
                border: "1px solid #aaa",
                borderRadius: "20px",
                padding: "5px 12px",
                fontSize: "12px",
                background: "#fff",
                cursor: "pointer",
              }}
            >
              프로필 수정
            </button>
          </div>

          {/* 메뉴 */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              fontWeight: "bold",
            }}
          >
            <a href="/mypage/orders">내 주문 내역</a>
            <a href="/mypage/wishlist">찜한 상품</a>
            <a href="/cart">장바구니</a>
            <a href="/mypage/reviews">나의 리뷰</a>
          </nav>
        </div>

        {/* ✅ 오른쪽 활동 내역 */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>활동내역</h2>
          <div style={{ marginBottom: "20px" }}>홍길동님의 활동</div>

          {/* 활동 박스 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>10</div>
              <div style={{ fontSize: "14px" }}>주문내역</div>
            </div>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>5</div>
              <div style={{ fontSize: "14px" }}>찜한 상품</div>
            </div>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>12</div>
              <div style={{ fontSize: "14px" }}>내가 쓴 리뷰</div>
            </div>
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>2</div>
              <div style={{ fontSize: "14px" }}>내가 올린 게시글</div>
            </div>
          </div>

          {/* ✅ 탭 (내가 올린 게시물 / 내가 쓴 댓글) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              borderBottom: "1px solid #ccc",
              marginBottom: "20px",
            }}
          >
            <button
              onClick={() => setActiveTab("posts")}
              style={{
                border: "none",
                background: "none",
                fontSize: "16px",
                fontWeight: activeTab === "posts" ? "bold" : "normal",
                color: activeTab === "posts" ? "#A40303" : "#000",
                cursor: "pointer",
                paddingBottom: "8px",
              }}
            >
              내가 올린 게시물
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              style={{
                border: "none",
                background: "none",
                fontSize: "16px",
                fontWeight: activeTab === "comments" ? "bold" : "normal",
                color: activeTab === "comments" ? "#A40303" : "#000",
                cursor: "pointer",
                paddingBottom: "8px",
              }}
            >
              내가 쓴 댓글
            </button>
          </div>

          {/* 탭 내용 */}
          {activeTab === "posts" ? (
            <div>📌 내가 올린 게시물 리스트</div>
          ) : (
            <div>💬 내가 쓴 댓글 리스트</div>
          )}
        </div>
      </div>
    </>
  );
}
